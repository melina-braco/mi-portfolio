import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent {
  contactForm: FormGroup;
  status: 'IDLE' | 'SENDING' | 'SUCCESS' | 'ERROR' = 'IDLE';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  onSubmit() {
    if (this.contactForm.invalid) return;

    this.status = 'SENDING';
    
    // Formspree endpoint (Crea tu cuenta en formspree.io y pega tu ID aquí)
    const endpoint = 'https://formspree.io/f/tu_id_aca';

    this.http.post(endpoint, this.contactForm.value).subscribe({
      next: () => {
        this.status = 'SUCCESS';
        this.contactForm.reset();
      },
      error: () => {
        this.status = 'ERROR';
      }
    });
  }
}