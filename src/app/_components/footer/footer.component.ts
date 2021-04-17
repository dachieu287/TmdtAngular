import { Component, OnInit } from '@angular/core';
import { faFacebookF, faGooglePlusG, faInstagram, faLinkedinIn, faPinterest, faTwitter } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  faFacebookF = faFacebookF;
  faTwitter = faTwitter;
  faGooglePlusG = faGooglePlusG;
  faLinkedinIn = faLinkedinIn;
  faInstagram = faInstagram;
  faPinterest = faPinterest;

  constructor() { }

  ngOnInit(): void {
  }

}
