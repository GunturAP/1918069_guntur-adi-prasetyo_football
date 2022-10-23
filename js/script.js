const ApiKey = "057814caea2f4257af645f430779c2fc";
const baseUrl = "https://api.football-data.org/v2/";
const leagueId = "2021";
const baseEndPoin = `${baseUrl}competitions/${leagueId}`;
const teamEndPoin = `${baseUrl}competitions/${leagueId}/teams`;
const standingEndPoin = `${baseUrl}competitions/${leagueId}/standings`;
const matchEndPoin = `${baseUrl}competitions/${leagueId}/matches`;


const contents = document.querySelector("#content-list");
const title = document.querySelector(".card-title");
const fetchHeader = {
    headers: {
        'X-Auth-Token': ApiKey
    }
};

function getListTeams() {
    title.innerHTML = "Daftar Tim Liga Primer Inggris"
    fetch(teamEndPoin, fetchHeader)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.teams);
            let teams = "";
            resJson.teams.forEach(team => {
                teams += `
                <li class="collection-item avatar">
                        <img src="${team.crestUrl}" alt="" class="circle">
                     
                        <span class="title">${team.name}</span>
                        <p>Berdiri: ${team.founded} <br>
                            Markas: ${team.venue}
                        </p>
                        <a href="index.html?id=${team.id}#info" class="secondary-content modal-trigger"><i class="material-icons">info</i></a>
                </li>
                
                `
            }
            );

            contents.innerHTML =
                '<ul class="collection ">' + teams + '</ul>'
        }).catch(err => {
            console.error(err);
        })

}

function getListStandings() {
    title.innerHTML = "Klasemen Sementara Liga Primer Inggris";
    fetch(standingEndPoin, fetchHeader)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.standings[0]);
            let teams = "";
            let i = 1;
            resJson.standings[0].table.forEach(team => {
                teams += `
                <tr>
                    <td style="padding-left:20px;">${i}.</td>
                    <td><img src="${team.team.crestUrl}" alt="${team.team.name}" width="30px"></td>
                    <td>${team.team.name}</td>
                    <td>${team.playedGames}</td>
                    <td>${team.won}</td>
                    <td>${team.draw}</td>
                    <td>${team.lost}</td>
                    <td>${team.points}</td>
                </tr>
                `;
                i++;

            });
            contents.innerHTML = `
                <div class="card">
                    <table class="stripped responsive-table">
                        <thead>
                            <th></th>
                            <th></th>
                            <th>Nama Tim</th>
                            <th>PG</th>
                            <th>W</th>
                            <th>D</th>
                            <th>L</th>
                            <th>P</th>
                        </thead>
                        <tbody>
                            ${teams}
                        </tbody>
                    </table>
                </div>
            `;
        }).catch(err => {
            console.error(err);
        })
}

function getListMatches() {
    title.innerHTML = "Jadwal Pertandingan Liga Primer Inggris";
    fetch(matchEndPoin, fetchHeader)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.matches);
            let matchs = "";
            let i = 1;
            resJson.matches.forEach(match => {
                let d = new Date(match.utcDate).toLocaleDateString("id");
                let scoreHomeTeam = (match.score.fullTime.homeTeam == null ? 0 : match.score.fullTime.homeTeam);
                let scoreAwayTeam = (match.score.fullTime.awayTeam == null ? 0 : match.score.fullTime.awayTeam);
                matchs += `
                <tr>
                    <td style="padding-left:20px;">${i}.</td>
                    <td>${match.homeTeam.name} vs ${match.awayTeam.name}</td>
                    <td>${d}</td>
                    <td>${scoreHomeTeam}:${scoreAwayTeam}</td>
                </tr>
                `;
                i++;

            });
            contents.innerHTML = `
                <div class="card">
                    <table class="stripped responsive-table">
                        <thead>
                            <th></th>
                            <th>Peserta</th>
                            <th>Tanggal</th>
                            <th>Skor Akhir</th>
                        </thead>
                        <tbody>
                            ${matchs}
                        </tbody>
                    </table>
                </div>
            `;
        }).catch(err => {
            console.error(err);
        })
}

function getinfoteams() {
    const urlParams = new URLSearchParams(window.location.search);
    const id_teams = urlParams.get('id')
    console.log(id_teams);
    const InfoEndPoin = `${baseUrl}teams/${id_teams}`;

    fetch(InfoEndPoin, fetchHeader)
        .then(response => response.json())
        .then(resJson => {
            title.innerHTML = 'Informasi Lengkap Tim &nbsp; &nbsp; ' + resJson.name + '&nbsp; &nbsp; <img src="' + resJson.crestUrl + '" alt="' + resJson.name + '" width="40px"> '
            console.log(resJson.squad);
            let pemain = "";
            let pelatih = "";
            let i = 1;
            resJson.squad.forEach(team => {
                if (team.role == 'COACH') {
                    pelatih += team.name
                }
                if (team.role == 'PLAYER') {
                    pemain += `
                <tr>
                    <td>${team.name}</td>
                    <td>${team.position}</td>
                    <td>${team.shirtNumber}</td>
                    <td>${team.nationality}</td>
                </tr>
                `;
                }


            });
            contents.innerHTML = `
                <table class="striped">
                    
                    <tbody>
                         <tr>
                            <td>Alamat</td>
                            <td> = </td>
                            <td>${resJson.address}</td>
                        </tr>
                        <tr>
                            <td>Telephone</td>
                            <td> = </td>
                            <td>${resJson.phone}</td>
                        </tr>
                        <tr>
                            <td>Website</td>
                            <td> = </td>
                            <td><a href="${resJson.website}">${resJson.website}</a></td>
                        </tr>
                        <tr>
                            <td>Warna Jersey</td>
                            <td> = </td>
                            <td>${resJson.clubColors}</td>
                        </tr>
                        <tr>
                            <td>Pelatih</td>
                            <td> = </td>
                            <td>${pelatih}</td>
                        </tr>
                        <tr>
                            <td>Tahun Berdiri</td>
                            <td> = </td>
                            <td>${resJson.founded}</td>
                        </tr>
                    </tbody>
                </table>
                <br>
                <br>
                <br>
                <table class="highlight">
                    <thead>
                        <tr>
                            <th>Nama Pemain</th>
                            <th>Posisi</th>
                            <th>Nomor Punggung</th>
                            <th>Kebangsaan</th>
                        </tr>
                    </thead>

                    <tbody>
                         ${pemain}
                    </tbody>
                </table>
            `;
        }).catch(err => {
            console.error(err);
        })
}

function loadPage(page) {
    switch (page) {
        case "teams":
            getListTeams();
            break;
        case "standings":
            getListStandings();
            break;
        case "matches":
            getListMatches();
            break;
        case "info_teams":
            getinfoteams();
            break;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);

    document.querySelectorAll(".sidenav a, .topnav a").forEach(elm => {
        elm.addEventListener("click", evt => {
            let sideNav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sideNav).close();
            page = evt.target.getAttribute("href").substr(1);
            loadPage(page);
        })
    })
    var page = window.location.hash.substr(1);
    if (page === "" || page === "!") page = "teams";
    else if (page == "info") {
        page = "info_teams"
    }
    console.log(page);
    loadPage(page);


});





