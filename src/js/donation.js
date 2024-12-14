import { User } from './user.js';

export class DonationManager {
    constructor() {
        this.minValue = 10;
        this.maxValue = 10000;
        this.targetValue = 10000;
        this.projectTargets = {
            'alimentacao': 10000,
            'saude': 10000,
            'animais': 10000
        };
    }

    // Formata o valor para moeda brasileira
    formatCurrency(value) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    }

    // Valida o valor da doação
    validateDonation(value) {
        const numValue = Number(value);
        if (isNaN(numValue)) {
            throw new Error('Valor inválido');
        }
        if (numValue < this.minValue) {
            throw new Error(`O valor mínimo para doação é ${this.formatCurrency(this.minValue)}`);
        }
        if (numValue > this.maxValue) {
            throw new Error(`O valor máximo para doação é ${this.formatCurrency(this.maxValue)}`);
        }
        return numValue;
    }

    // Calcula a porcentagem da meta atingida
    calculateProgress(currentValue) {
        return (currentValue / this.targetValue) * 100;
    }

    // Registra uma nova doação
    async makeDonation(value, project) {
        try {
            const user = User.load();
            if (!user) {
                throw new Error('Usuário não encontrado. Por favor, faça login.');
            }

            if (!project) {
                throw new Error('Por favor, selecione um tipo de doação.');
            }

            const validatedValue = this.validateDonation(value);

            const projectNames = {
                'alimentacao': 'Alimentação',
                'saude': 'Saúde',
                'animais': 'Animais'
            };

            const donation = {
                value: validatedValue,
                project: project,
                projectName: projectNames[project] || project,
                date: new Date(),
                formattedValue: this.formatCurrency(validatedValue)
            };

            user.donations.push(donation);
            user.save();

            return {
                success: true,
                message: 'Doação realizada com sucesso!',
                donation: donation
            };
        } catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    }

    // Retorna o total doado por projeto
    getTotalDonatedByProject(projectType) {
        const user = User.load();
        if (!user || !user.donations) return 0;

        return user.donations
            .filter(donation => donation.project === projectType)
            .reduce((total, donation) => total + donation.value, 0);
    }

    // Retorna o progresso atual em relação a meta do projeto
    getCurrentProgress(projectType) {
        if (!projectType) return { total: 0, formatted: this.formatCurrency(0), percentage: 0 };
        
        const totalDonated = this.getTotalDonatedByProject(projectType);
        const target = this.projectTargets[projectType] || this.targetValue;
        
        return {
            total: totalDonated,
            formatted: this.formatCurrency(totalDonated),
            percentage: this.calculateProgress(totalDonated, target)
        };
    }

    // Calcula a porcentagem da meta atingida para um projeto específico
    calculateProgress(currentValue, targetValue) {
        return (currentValue / targetValue) * 100;
    }
}

// Inicializa os eventos da pagina de doação
document.addEventListener('DOMContentLoaded', () => {
    const donationManager = new DonationManager();
    const projectImages = {
        'alimentacao': '../src/assets/images/alimentacao.jpg',
        'saude': '../src/assets/images/saude.jpg',
        'animais': '../src/assets/images/abrigo-animais.jpg'
    };

    // Verifica  tipo de projeto na URL
    const urlParams = new URLSearchParams(window.location.search);
    const projectType = urlParams.get('type');
    
    // seleciona-o automaticamente
    if (projectType) {
        const projectSelect = document.querySelector('#selec');
        if (projectSelect) {
            projectSelect.value = projectType;
            // Dispara o evento change manualmente para atualizar a imagem e o progresso
            projectSelect.dispatchEvent(new Event('change'));
        }
    }

    // Atualiza a imagem do projeto
    function updateProjectImage(projectType) {
        const imgElement = document.querySelector('#img');
        if (imgElement && projectImages[projectType]) {
            imgElement.src = projectImages[projectType];
        }
    }

    // Atualiza a barra de progresso
    function updateProgressBar(percentage) {
        const progressBar = document.querySelector('.progress-bar');
        if (progressBar) {
            progressBar.style.width = `${Math.min(100, percentage)}%`;
            progressBar.setAttribute('aria-valuenow', percentage);
        }
    }

    // Formata o input para moeda
    function formatInputAsCurrency(input) {
        let value = input.value.replace(/\D/g, '');
        value = (parseInt(value) / 100).toFixed(2);
        input.value = donationManager.formatCurrency(value);
    }

    // Configura o select de projeto
    const projectSelect = document.querySelector('#selec');
    if (projectSelect) {
        projectSelect.addEventListener('change', (event) => {
            const selectedProject = event.target.value;
            updateProjectImage(selectedProject);
            
            // Atualiza a barra de progresso para o projeto selecionado
            const progress = donationManager.getCurrentProgress(selectedProject);
            updateProgressBar(progress.percentage);
            
            // Atualiza o texto da meta
            const progressText = document.querySelector('.progress-text');
            if (progressText) {
                const target = donationManager.projectTargets[selectedProject] || donationManager.targetValue;
                progressText.textContent = `Meta: ${donationManager.formatCurrency(target)} - Arrecadado: ${progress.formatted}`;
            }
        });
    }

    // Configura os botões de valor fixo
    const valueButtons = document.querySelectorAll('.pagamento button');
    valueButtons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent.replace(/\D/g, '');
            const input = document.querySelector('#insert-value input');
            input.value = donationManager.formatCurrency(value);
        });
    });

    // Configura o input personalizado
    const customInput = document.querySelector('#insert-value input');
    if (customInput) {
        customInput.addEventListener('input', () => formatInputAsCurrency(customInput));
    }

    // Configura o botão de doar
    const doarButton = document.querySelector('#doar');
    if (doarButton) {
        doarButton.addEventListener('click', async () => {
            const input = document.querySelector('#insert-value input');
            const value = input.value.replace(/\D/g, '') / 100;
            const projectSelect = document.querySelector('#selec');
            const project = projectSelect.value;

            if (!project) {
                alert('Por favor, selecione um tipo de doação.');
                return;
            }

            const result = await donationManager.makeDonation(value, project);
            
            if (result.success) {
                alert(result.message);
                // Atualiza o progresso do projeto específico
                const progress = donationManager.getCurrentProgress(project);
                updateProgressBar(progress.percentage);
                
                // Atualiza o texto da meta
                const progressText = document.querySelector('.progress-text');
                if (progressText) {
                    const target = donationManager.projectTargets[project];
                    progressText.textContent = `Meta: ${donationManager.formatCurrency(target)} - Arrecadado: ${progress.formatted}`;
                }
                
                // Mantém o projeto selecionado após a doação
                input.value = '';
            } else {
                alert(result.message);
            }
        });
    }

    // Inicializa a barra de progresso com o projeto selecionado
    const initialProject = document.querySelector('#selec').value;
    if (initialProject) {
        const progress = donationManager.getCurrentProgress(initialProject);
        updateProgressBar(progress.percentage);
        
        // Atualiza o texto da meta inicial
        const progressText = document.querySelector('.progress-text');
        if (progressText) {
            const target = donationManager.projectTargets[initialProject];
            progressText.textContent = `Meta: ${donationManager.formatCurrency(target)} - Arrecadado: ${progress.formatted}`;
        }
    }
});
