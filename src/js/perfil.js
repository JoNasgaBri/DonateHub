// script.js

class User {
    constructor(name, email, memberSince) {
        this.name = name;
        this.email = email;
        this.memberSince = memberSince;
    }

    renderProfile() {
        document.getElementById('username').innerText = this.name;
        document.getElementById('useremail').innerText = this.email;
        document.getElementById('memberSince').innerText = this.memberSince;
    }
}

class Dashboard {
    constructor(user) {
        this.user = user;
        this.activityList = [];
    }

    addActivity(activity) {
        this.activityList.push(activity);
        this.renderActivity();
    }

    renderActivity() {
        const activityListElement = document.getElementById('activityList');
        activityListElement.innerHTML = ''; // Limpa a lista atual
        this.activityList.forEach(activity => {
            const li = document.createElement('li');
            li.innerText = activity;
            activityListElement.appendChild(li);
        });
    }
}

// Uso
const user = new User('João Silva', 'joao.silva@example.com', 'Janeiro 2020');
const dashboard = new Dashboard(user);

user.renderProfile();
dashboard.addActivity('Login em 27 de Novembro de 2024');
dashboard.addActivity('Atualizou informações do perfil');
dashboard.addActivity('Alterou a senha');