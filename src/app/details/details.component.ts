import { Component, Input, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { HousingLocation } from "../housing-location";
import { HousingService } from "../housing.service";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-details",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `<article>
    <section>
      <img
        src="{{ housingLocationData?.photo }}"
        alt="broken image of {{ housingLocationData?.name }}"
        class="housing-image"
      />
      <h1>{{ housingLocationData?.name }}</h1>
      <p>{{ housingLocationData?.city }} , {{ housingLocationData?.state }}</p>
      <p>Wifi : {{ housingLocationData?.wifi ? "Yes" : "No" }}</p>
      <p>laundry : {{ housingLocationData?.laundry ? "Yes" : "No" }}</p>
    </section>
    <section>
      <h1>Apply to live here:</h1>
      <form [formGroup]="applyForm" (submit)="submitApplication()">
        <label for="first-name">First Name</label>
        <input id="first-name" type="text" formControlName="firstName" />

        <label for="last-name"> Last Name</label>
        <input id="last-name" type="text" formControlName="lastName" />

        <label for="email">Email</label>
        <input id="email" type="email" formControlName="email" />

        <button type="submit">Apply Now</button>
      </form>
    </section>
  </article>`,
  styleUrls: ["./details.component.css"],
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingLocationId = 0;
  housingService: HousingService = inject(HousingService);
  housingLocationData: HousingLocation | undefined;
  // @Input data!:
  applyForm = new FormGroup({
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    email: new FormControl(""),
  });

  constructor() {
    this.housingLocationId = Number(this.route.snapshot.params["id"]);
    this.housingService
      .getHousingLocationById(this.housingLocationId)
      .then(
        (housingLocationData: HousingLocation | undefined) =>
          (this.housingLocationData = housingLocationData)
      );
  }

  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? "",
      this.applyForm.value.lastName ?? "",
      this.applyForm.value.email ?? ""
    );
  }
}
