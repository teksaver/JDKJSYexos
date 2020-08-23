"use strict";

const dayStart = "07:30";
const dayEnd = "17:45";

class Horaire{
    constructor(chaine){
        let chaineHeures, chaineMinutes;
        [chaineHeures, chaineMinutes] = chaine.split(':');
        this.heures = parseInt(chaineHeures,10);
        this.minutes = parseInt(chaineMinutes, 10);
    }

    ajouterDuree(chaineDuree){
        let duree = parseInt(chaineDuree, 10);
        this.heures += Math.floor((this.minutes + duree) / 60);
        this.minutes = (this.minutes + duree) % 60;
    }

    toString(){
        return `${String(this.heures).padStart(2,"0")}h${String(this.minutes).padStart(2,"0")}`;
    }

    estEgalOuApres(autreHoraire){
        return (this.toString() >= autreHoraire.toString());
    }
}

// scheduleMeeting(..) should take a start time (in 24-hour format as a string "hh:mm") and a meeting duration (number of minutes). It should return true if the meeting falls entirely within the work day (according to the times specified in dayStart and dayEnd); return false if the meeting violates the work day bounds.
function scheduleMeeting(startTime,durationMinutes) {
    // création des objets horaires
    let horaireMin = new Horaire(dayStart);
    let horaireMax = new Horaire(dayEnd);
    let meeting = new Horaire(startTime);

    let chaineInfoDebut = `le meeting débutant à ${meeting}`; 

    // si le meeting débute trop tôt, on renvoie faux
    if (!meeting.estEgalOuApres(horaireMin)){
        console.log(`${chaineInfoDebut} commence trop tôt`);
        return false;
    }

    // si la fin du meeting est torp tard, on renvoie faux
    meeting.ajouterDuree(durationMinutes);

    if (horaireMax.estEgalOuApres(meeting)){
        console.log(`${chaineInfoDebut} et finissant à ${meeting} termine dans la période`);
        return true;
    }
    console.log(`${chaineInfoDebut} et finissant à ${meeting} termine trop tard`);
    return false;
    
}

scheduleMeeting("7:00",15);     // false
scheduleMeeting("07:15",30);    // false
scheduleMeeting("7:30",30);     // true
scheduleMeeting("11:30",60);    // true
scheduleMeeting("17:00",45);    // true
scheduleMeeting("17:30",30);    // false
scheduleMeeting("18:00",15);    // false
scheduleMeeting("18:00",150);    // false