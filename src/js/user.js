export class User {
    constructor(name, email, phone, cep, cpf) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.cep = cep;
        this.cpf = cpf;
        this.createdAt = new Date();
        this.donations = [];
    }

    save() {
        const userData = {
            name: this.name,
            email: this.email,
            phone: this.phone,
            cep: this.cep,
            cpf: this.cpf,
            createdAt: this.createdAt,
            donations: this.donations
        };
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('usuarioCadastrado', 'true');
    }

    static load() {
        try {
            const data = localStorage.getItem('userData');
            if (data && localStorage.getItem('usuarioCadastrado') === 'true') {
                const userData = JSON.parse(data);
                const user = new User(
                    userData.name,
                    userData.email,
                    userData.phone,
                    userData.cep,
                    userData.cpf
                );
                user.createdAt = new Date(userData.createdAt);
                user.donations = userData.donations || [];
                return user;
            }
        } catch (error) {
            console.error('Erro ao carregar os dados do usuário:', error);
        }
        return null;
    }

    static clear() {
        try {
            localStorage.removeItem('userData');
            localStorage.removeItem('usuarioCadastrado');
            localStorage.removeItem('userActivities');
        } catch (error) {
            console.error('Erro ao limpar dados do usuário:', error);
        }
    }
}