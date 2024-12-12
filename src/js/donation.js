import { User } from './user.js';

export class DonationManager {
    constructor() {
        this.minValue = 10;
        this.maxValue = 10000;
        this.targetValue = 10000;
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

            const validatedValue = this.validateDonation(value);

            const donation = {
                value: validatedValue,
                project: project,
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

    // Retorna o total doado por um usuario
    getTotalDonated() {
        const user = User.load();
        if (!user || !user.donations) return 0;

        return user.donations.reduce((total, donation) => total + donation.value, 0);
    }

    // Retorna o progresso atual em relação a meta
    getCurrentProgress() {
        const totalDonated = this.getTotalDonated();
        return {
            total: totalDonated,
            formatted: this.formatCurrency(totalDonated),
            percentage: this.calculateProgress(totalDonated)
        };
    }
}

// Inicializa os eventos da pagina de doação
document.addEventListener('DOMContentLoaded', () => {
    const donationManager = new DonationManager();

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

    // Configura os botows de valor fixo
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
            const project = document.querySelector('#selec').value;

            const result = await donationManager.makeDonation(value, project);
            
            if (result.success) {
                alert(result.message);
                const progress = donationManager.getCurrentProgress();
                updateProgressBar(progress.percentage);
            } else {
                alert(result.message);
            }
        });
    }

    // Inicializa a barra de progresso
    const progress = donationManager.getCurrentProgress();
    updateProgressBar(progress.percentage);
});
