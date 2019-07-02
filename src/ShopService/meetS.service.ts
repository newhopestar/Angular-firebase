import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AngularFireDatabase, } from '@angular/fire/database';


@Injectable()

export class meetService {
    shopId;
    hStart;
    hEnd;
    newMeetTime;
    meetType;
    DateMeet;
    nWday;
    workDayTime = [];
    dayWork;
    startWork;
    endWork;
    url = "https://webcut-2001a.firebaseio.com/";
    public houers;

    constructor(private afDb: AngularFireDatabase, private _http: Http) {

    }
    setMeetType(type) {
        this.meetType = type;

    }
    // מחסיר את התורים מהתורים הריקים 
    getEmptyMeets(meets) {


        var key;
        // console.log("meets : ",Object.keys(meets).length)
        for (var i = 0; i < Object.keys(meets).length; i++) {
            key = meets[i].$key
            //   console.log("key : ", key)
            if (key != undefined) {
                //console.log(key)
                //Flow meet
                if (!meets[i].flow) {
                    var newMeet = key.split(":", 2).map(Number);
                    var newMeet2 = key.split(":", 2).map(Number);

                    var meetTime = meets[i].meetTime;//קדימה זמן התור הרצוי
                    meetTime = meetTime / 5;

                    this.newMeetTime = this.meetType.meetTime;// זמן התור הרצוי אחורה
                    this.newMeetTime = this.newMeetTime / 5;

                    console.log("newMeetTime: ", this.newMeetTime)
                    //  
                    //בדיקת של תורים שקיימים

                    for (var m = 0; m < meetTime; m++) {

                        if ((this.nWday[newMeet[0]][newMeet[1]]) != undefined) {
                            this.nWday[newMeet[0]][newMeet[1]] = 0;


                            if (newMeet[1] == 55) {
                                newMeet[1] = 0;
                                newMeet[0]++;
                            }
                            else {
                                newMeet[1] += 5;
                            }
                        }

                    }

                    //  console.log("split ",newMeet2)

                    for (var d = 0; d < (this.newMeetTime - 1); d++) {
                        // console.log(newMeet2[0], newMeet2[1])
                        if (newMeet2[1] == 0) {
                            newMeet2[1] = 55;
                            newMeet2[0] -= 1;
                        } else {
                            newMeet2[1] -= 5;
                        }
                        if (this.nWday[newMeet2[0]]) {
                            if ((this.nWday[newMeet2[0]][newMeet2[1]] != undefined) && (this.nWday[newMeet2[0]][newMeet2[1]] != 0)) {
                                this.nWday[newMeet2[0]][newMeet2[1]] = 2;
                            }
                        } else {
                            console.log("no")
                        }
                        // console.log(this.nWday[newMeet2[0]][newMeet2[1]])
                        //     console.log("now cheak : ",this.nWday[newMeet2[0]][newMeet2[1]]);
                        //  if ((this.nWday[newMeet2[0]][newMeet2[1]] != undefined) && (this.nWday[newMeet2[0]][newMeet2[1]] != 0)) {
                        ///       this.nWday[newMeet2[0]][newMeet2[1]] = 2;
                        // }

                    }


                    //console.log( this.workDayTime);

                    console.log(this.nWday);
                }

            }
        }

    }
    getCompleteMeets() {
        var compMeet = [];
        var houer = {};
        var newarray = [];
        this.hStart

        var minEnd = 60;
        var minStat = this.hStart[1];
        var a;
        for (var i = this.hStart[0]; i < (this.hEnd[0] + 1); i++) {

            houer["houer"] = i;


            if (i == this.hEnd[0]) {
                minEnd = this.hEnd[1];
            }
            a = 0
            for (var m = minStat; m < minEnd; m += 5) {

                if (this.nWday[i][m] == 1) {

                    newarray[a] = m;
                    if (m == 5) {
                        newarray[a] = "05"
                    }
                    if (m == 0) {
                        newarray[a] = "00"
                    }
                    a++;
                } else {
                    //  console.log(i, " : ", m)
                }


            }
            houer["min"] = newarray;
            newarray = [];
            minStat = 0;
            compMeet.push(houer);
            houer = {};
        }
        return compMeet;
    }

    getDateTafus(newDate) {
        this.DateMeet = newDate;

        // this._http.get(this.url + '/BarberShop/' + this.shopId + "/Meetings/" + this.DateMeet + ".json")

        // מחזיר את כל התורים שיש באותו יום
        return this.afDb.list(this.url + '/BarberShop/' + this.shopId + "/Meetings/" + this.DateMeet)
        //  .map(response => response.json())

    }
    getShopId(x) {
        this.shopId = x;


    }
    // מחזיר את השעות עבודה של העסק
    getShopScez() {

        return this.afDb.list(this.url + '/BarberShop/' + this.shopId + "/WorkDays/")
        // .map(response => response.json())

    }

    //יוצר מערך שלש עות עבודה לי הלוז
    arrayOfHouers() {

        var timeObject;

        this.hStart = this.startWork.split(":", 2).map(Number);
        this.hEnd = this.endWork.split(":", 2).map(Number);
        var minEnd = 60;
        var minStat = this.hStart[1];

        //   console.log("hS : " + this.hStart[0] + ": " + this.hStart[1])
        //   console.log("hE : " + this.hEnd[0] + ": " + this.hEnd[1])
        for (var i = this.hStart[0]; i < (this.hEnd[0] + 1); i++) {

            this.workDayTime[i] = [];

            if (i == this.hEnd[0]) {
                minEnd = this.hEnd[1];
            }

            for (var m = minStat; m < minEnd; m += 5) {

                this.workDayTime[i][m] = 1;

            }
            minStat = 0;
        }
        console.log(this.workDayTime);
        this.nWday = this.workDayTime;

    }
    cheakIfTimeExist(h, m) {
        return this.afDb.object(this.url + '/BarberShop/' + this.shopId + "/Meetings/" + this.DateMeet + "/" + h + ":" + m)
        //    .map(response => response.json())
    }


    cleanService() {

        this.hStart = 0;
        this.hEnd = 0;
        this.workDayTime = [];
        this.dayWork = null;
        this.startWork = null;
        this.endWork = null;
    }
}