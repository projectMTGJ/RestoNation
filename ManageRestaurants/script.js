import { readFileSync, writeFileSync } from 'fs';
var endRefuse;
const connect = {
    initiateKey: async function() {
        try {
            const data = JSON.parse(readFileSync('token.json', 'utf8'));
            data.key = await this.generateKey(15);
            writeFileSync('token.json', JSON.stringify(data, null, 2), 'utf8');
        } catch (error) {
            console.error("Il y a un problème veuillez contacter l'Administrateur: " + error);
        }
    },
    generateKey: function(len) {
        const letters = 'abcdefghijklmnopqrstuvwxyz';
        let code = '';
        for (let i = 0; i < len; i++) {
            code += letters[Math.floor(Math.random() * letters.length)];
        }
        return Promise.resolve(code);
    },
    joinCreatedLink: function(call) {
        const currentUrl = window.location.href;
        const currentUrlObj = new URL(currentUrl);
        fetch("token.json")
            .then(response => response.json())
            .then(data => {
                window.location.replace(`${currentUrlObj}/${call}?auth=${data.key}`);
            })
            .catch(error => alert("Il y a un problème veuillez contacter l'Administrateur"+error));
    },
    check: function() {
        fetch("token.json")
            .then(response => response.json())
            .then(data => {
                if (document.getElementById('code').value == data.key) this.open();
                else this.refuse();
            })
            .catch(error => console.error('Error fetching the token:', error));
    },
    request: function() {
        fetch("token.json")
            .then(response => response.json())
            .then(data => {
                alert(data.key)
                document.getElementById('code').value = data.key;
            })
            .catch(error => alert("Il y a un problème veuillez contacter l'Administrateur"+error));
    },
    open: function(start=400) {
        endRefuse && clearTimeout(endRefuse);
        ['fieldSetterCode','ButtonCodeSend'].forEach(el => {document.getElementById(el).style = "opacity: 0;"})
        setTimeout(() => {
            document.getElementById('personImage').style = "transform: translateY(32%);";
        }, start+=400);
        setTimeout(() => {
            document.getElementById('personImage').style = "border: 0 solid rgb(61, 205, 25); border-radius: 150px; transform: translateY(32%);";
            document.getElementById('authcontainer').style = "box-shadow: 0 0 400px rgb(61, 205, 25); background-color: rgb(61, 205, 25);";
            document.getElementById('loadericon').style = "opacity: 1; height: 80px;";
        }, start+=200);
        setTimeout(() => {
            document.getElementById('authenticator').style = "opacity: 0; transform: scale(1.5);";
            document.getElementById('containator').classList.remove('blur');
        }, start+=1500);
        setTimeout(() => {
            document.getElementById('authenticator').style = "display: none;";
            document.getElementById('containator').classList.remove('blur');
            document.getElementById('containator').style = "z-index: 9999;";
        }, start+=400);
    },
    refuse: function() {
        document.getElementById('fieldSetterCode').style = "border: 2px solid rgba(255, 70, 70, 0.6);";
        document.getElementById('authcontainer').style = "box-shadow: 0 0 400px rgb(255, 70, 70); background-color: rgb(155, 70, 70);";
        document.getElementById('personImage').style = "border: 4px solid rgb(255, 70, 70); border-radius: 160px; box-shadow: 0 0 200px rgb(255, 70, 70);";
        endRefuse = setTimeout(() => {
            document.getElementById('fieldSetterCode').style = "border: 2px solid rgba(178, 178, 178, 0.6);";
            document.getElementById('authcontainer').style = "box-shadow: 0 0 40px rgb(255, 128, 0); background-color: rgb(87, 87, 87);";
            document.getElementById('personImage').style = "border: 4px solid aliceblue; border-radius: 50px;";
        }, 2000);
    },
    lock: function() {
        location.reload();
    }
}