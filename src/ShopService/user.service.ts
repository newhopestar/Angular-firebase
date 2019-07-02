import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AngularFireDatabase, } from '@angular/fire/database';


@Injectable()

export class userService {


    ProfilePic: string;
    BarberID: string;
    email: string;
    fName: string;
    lName: string;
    Birthday: string;
    shopOwner: string;
    shopOwnerID: string;
    StarsCount: number;
    key;

    user = {
        ProfilePic: "",
        BarberID: "",
        email: "",
        fName: "",
        lName: "",
        Birthday: "",
        shopOwner: "",
        shopOwnerID: "",
        StarsCount: 0
    }


    constructor(private afDb: AngularFireDatabase, private _http: Http) {

    }

    saveUserData(uData) {
        console.log(uData)

        this.key = uData.$key;
        this.user.ProfilePic = uData.ProfilePic;
        this.user.BarberID = uData.barberID;
        this.user.email = uData.email;
        this.user.fName = uData.fname;
        this.user.lName = uData.lname;
        this.user.Birthday = uData.Birthday;
        this.user.shopOwner = uData.shopOwner;
        this.user.shopOwnerID = uData.shopOwner.id;
        this.user.StarsCount = uData.starsCount;


    }
    cheakIfHave() {
        if (this.user.BarberID)
            return true;

        return false;
    }
    updateShopId(shopId) {
        return this.afDb.object('/Users/' + this.key)
            .update({
                barberID: shopId
            })

    }
    getUserMeetByShop(shopid) {
        return this.afDb.list('/Users/' + this.key + "/meetings/" + shopid, )

    }
    deletMeet(shopID, Mkey) {
        return this.afDb.object('/Users/' + this.key + "/meetings/" + shopID + "/" + Mkey).remove()
            .catch()

    }
    getUserDetalisByUid(uid) {
        return this.afDb.object('/Users/' + uid)
    }
}