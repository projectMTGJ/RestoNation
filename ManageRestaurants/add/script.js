var checkAuthWhenConnect = function() {
    const currentUrl = window.location.href;
    const currentUrlObj = new URL(currentUrl);
    const currentParams = new URLSearchParams(currentUrlObj.search);
    fetch("https://raw.githubusercontent.com/projectMTGJ/StrasCroute/master/ManageRestaurants/token.json")
        .then(response => response.json())
        .then(data => {
            if (currentParams.get('auth') == data.key) return;
            else {
                alert(data.key+" / "+currentParams.get('auth'));
                document.getElementById('containMain').style = "filter: blur(50px);"
                document.getElementById('forceCloseWindow').style = "opacity: 1;"
                document.getElementById('contentWin').style = "height: 65%; width: 35%;"
                setTimeout(() => {
                    for (let i=0; i<=2; i++) document.getElementById(i.toString()).style = "opacity: 1;"
                }, 1000);
                setTimeout(() => {window.close()}, 5000);
            }
        })
        .catch(error => alert("Il y a un problème veuillez contacter l'Administrateur"+error));
}

