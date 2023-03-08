import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hacker } from 'src/app/models/hacker';
import { LookupIpService } from 'src/app/service/lookup-ip.service';
import { ManagerHackerService } from 'src/app/service/manager-hacker.service';

@Component({
  selector: 'app-hacker-form',
  templateUrl: './hacker-form.component.html',
  styleUrls: ['./hacker-form.component.css']
})
export class HackerFormComponent {

  constructor(private search: LookupIpService, private sauvegarde: ManagerHackerService) { }

  hacker: Hacker = new Hacker('', '', '', '')

  hackerForm = new FormGroup({
    ip: new FormControl(''),
    countryName: new FormControl(''),
    regionName: new FormControl(''),
    city: new FormControl(''),
    id: new FormControl(undefined)
  })

  onSubmit() {
    console.log("Submit")
    console.log(this.hackerForm.value)
  }

  clear() {
    this.hackerForm.controls.ip.setValue("IP à renseigner")
    this.hackerForm.controls.regionName.setValue("")
    this.hackerForm.controls.city.setValue("")
    this.hackerForm.controls.countryName.setValue("")
    console.log("cancel")
    console.log(this.hackerForm.value)
  }


  lookfor() {
    console.log(this.hackerForm.controls.ip.getRawValue())
    let ipAdress: string = this.hackerForm.controls.ip.getRawValue() + ''
    if (ipAdress === "") {
      this.search.getGeoLocationIp(ipAdress).subscribe((res: any) => {
        this.hackerForm.controls.ip.setValue(res.ip)
        this.hackerForm.controls.regionName.setValue(res.region_name)
        this.hackerForm.controls.city.setValue(res.city)
        this.hackerForm.controls.countryName.setValue(res.country_name)
      });
    } else {
      console.log("loc introuvable")
    }
  }

  save(){
    let ipAdress: string = this.hackerForm.controls.ip.getRawValue() + ''
    let regionName: string = this.hackerForm.controls.regionName.getRawValue() + ''
    let city: string = this.hackerForm.controls.city.getRawValue() + ''
    let countryName: string = this.hackerForm.controls.countryName.getRawValue() + ''

    var arrayOfData = [ipAdress, regionName, city, countryName];

    this.sauvegarde.setAllHackerInLS(arrayOfData);

  }

  doer(){
    this.save();
    this.onSubmit();
  }
}
