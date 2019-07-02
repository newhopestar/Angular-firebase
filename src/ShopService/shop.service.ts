import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, } from '@angular/fire/database';


@Injectable()

export class ShopService {
    shopID;
    shopType = "BarberShop";
    usersShop;
    usersUsers;
    Users = {
        fname: "",
        lname: "",
        phone: "",
        Birthday: "",
        gender: "",
        ProfilePic: "",
        lastOrder: "",
        numOrders: "",
    }

    WorkDays = {
        dayName: "",
        timeEnd: "",
        timeStart: "",
    }

    Rating = {
        Avg: "",
        Total: "",
        Vote: ""
    }

    Setting = {
        message: "",
        about: "",
        CalendarRestriction: 0,
        location: "",
        logo: "",
        name: "",
        phone: "",
        photos: [],
        ProfilePic: ""


    }
    MeetingType = [{
        info: "",
        meetTime: "",
        name: "",
        pic: ""
    }]



    shop = {
        ProfilePic: "",
        BarberID: "",
        email: "",
        fName: "",
        lName: "",
        Birthday: "",
        StarsCount: 0
    }


    constructor(private afDb: AngularFireDatabase, private _http: Http) {


    }

    saveUserDate(uData, key1, i) {
        console.log("udata:   ", uData)
        // for(var i=0;i<uData.length;i++){
        //       this.Users[i] = {
        // fname: uData.fname,
        // lname: uData.lname,
        // phone: uData.phone,
        // Birthday: uData.Birthday,
        // gender: uData.gender,
        // ProfilePic: uData.ProfilePic,
        // lastOrder: uData.lastOrder,
        // numOrders: uData.numOrders,
        //     }   
        // }

        this.Users = {
            fname: uData.fname,
            lname: uData.lname,
            phone: uData.phone,
            Birthday: uData.Birthday,
            gender: uData.gender,
            ProfilePic: uData.ProfilePic,
            lastOrder: uData.lastOrder,
            numOrders: uData.numOrders,
        }
    }

    saveShopDetilsTopBar(Settings) {
        this.Setting.logo = Settings.logo;

    }
    saveShopDetils(shopD) {


        this.Rating = {
            Avg: shopD.Rating.Avg,
            Total: shopD.Rating.Total,
            Vote: shopD.Rating.Vote
        }

        // console.log("Rating : ", this.Rating)

        this.Setting = {
            message: shopD.Setting.Message,
            about: shopD.Setting.about,
            CalendarRestriction: shopD.Setting.limitMeet,
            location: shopD.Setting.location,
            logo: shopD.Setting.logo,
            name: shopD.Setting.name,
            phone: shopD.Setting.phone,
            photos: shopD.Setting.photos,
            ProfilePic: shopD.Setting.profilePic
        }


        for (let i = 0; i < shopD.MeetingType.length; i++) {
            let meet = {
                info: shopD.MeetingType[i].info,
                meetTime: shopD.MeetingType[i].meetTime,
                name: shopD.MeetingType[i].name,
                pic: shopD.MeetingType[i].pic
            }

            this.MeetingType[i] = meet;
        }

        for (let i = 0; i < shopD.WorkDays.length; i++) {
            let day = {
                dayName: shopD.WorkDays[i].dayName,
                timeEnd: shopD.WorkDays[i].timeEnd,
                timeStart: shopD.WorkDays[i].timeStart
            }

            this.WorkDays[i] = day;
        }
        //  console.log("MeetingType : ", this.MeetingType)

    }
    getShopDetils(shopID) {
        this.shopID = shopID;
        return this.afDb.object('/' + this.shopType + '/' + shopID)
    }
    getMeetType() {
        return this.afDb.list('/BarberShop/' + this.shopID + "/MeetingType");
    }


    getHolidays() {
        return this.afDb.list('/BarberShop/' + this.shopID + "/Holidays");
    }

    getSetting() {
        return this.afDb.object('/BarberShop/' + this.shopID + "/Setting/").valueChanges();
    }

    addHolidays(obj) {
        let shop = this.afDb.list('/BarberShop/' + this.shopID + "/Holidays/");
        shop.push(obj);
    }
    getUsers() {
        return this.afDb.object('/BarberShop/' + this.shopID + "/Users/");
    }


    getmyMeetings() {
        return this.afDb.list('/BarberShop/' + this.shopID + "/Meetings");
    }

    getmyMeetingsHours(key) {
        return this.afDb.list('/BarberShop/' + this.shopID + "/Meetings/" + key);
    }
    addMeetingsType(obj) {
        let shop = this.afDb.list('/BarberShop/' + this.shopID + "/MeetingType/");
        shop.push(obj);
    }
    // בדיקה האם החנות עובדת
    cheakIfWork(day) {
        if (this.WorkDays[day]) {
            if ((this.WorkDays[day].Start) && (this.WorkDays[day].End)) {
                return true
            }
        }

        return false;
    } getAllShop() {
        return this.afDb.list('/' + this.shopType + '/');
    }
    deletMeet(Mtime, Mdate) {
        return this.afDb.object('/' + this.shopType + '/' + this.shopID + "/meetings/" + Mdate + "/" + Mtime).remove()
            .catch()
    }

    deleteMeetType(key) {
        return this.afDb.object('/' + this.shopType + '/' + this.shopID + "/MeetingType/" + key).remove()
            .catch()
    }
    deleteHoliday(key) {
        return this.afDb.object('/' + this.shopType + '/' + this.shopID + "/Holidays/" + key).remove()
            .catch()
    }

    updateWorkDays(key, timeStart, timeEnd) {
        this.afDb.object('/' + this.shopType + '/' + this.shopID + '/WorkDays/' + key).update({
            timeStart: timeStart,
            timeEnd: timeEnd,
        })
    }

    updateSetting(obj) {
        this.afDb.object('/' + this.shopType + '/' + this.shopID + '/Setting/').update({
            name: obj.name,
            phone: obj.phone,
            limitMeet: obj.limitMeet,
            about: obj.about
        })
    }


    uploadImg(selectedFile) {
        // let storageRef = firebase.storage().ref()
        // console.log(firebase.storage().ref());
        // let success = false;

        //       let af = this.af;
        //   //  let folder = this.folder;
        //     let path = `/Users/${this.key}/${selectedFile.name}`;
        //     var iRef = storageRef.child(path);
        //     iRef.put(selectedFile).then((snapshot) => {
        //         console.log('Uploaded a blob or file! Now storing the reference at',`/Users/${this.key}/images/`);
        //         af.database.list(`/Users/${this.key}/images/`).push({ path: path, filename: selectedFile.name })
        //     });
    }



}