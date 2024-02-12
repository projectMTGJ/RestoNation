const fields = [
    {
        name: "Nom du Restaurant",
        inputType: "text"
    }
]

const action = {
    date: function(id) {
        const date = new Date();
        document.getElementById(id).value = date.getFullYear() + '-' + ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1) + '-' + (date.getDate() < 10 ? '0' : '') + date.getDate();
    }
}