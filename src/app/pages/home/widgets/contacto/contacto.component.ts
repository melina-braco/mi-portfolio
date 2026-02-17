import { Component, OnInit } from '@angular/core';
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
export class ContactoComponent implements OnInit {
  contactForm!: FormGroup; // Tipo correcto
  status: 'IDLE' | 'SENDING' | 'SUCCESS' | 'ERROR' = 'IDLE';

  constructor(
    private fb: FormBuilder, 
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,4}$")]],
      subject: ['', [Validators.required, Validators.minLength(3)]],
      message: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  onSubmit() {
    // Si el form es inválido, no hace nada (el botón debería estar disabled)
    if (this.contactForm.invalid) return;

    this.status = 'SENDING';

    const payload = {
      service_id: 'service_gxj8qb3',
      template_id: 'template_h3g10mu',
      user_id: 'up5h2g1irw8cmIr3X',
      template_params: {
        name: this.contactForm.value.email, // El template  {{name}}
        title: this.contactForm.value.subject, // El template  {{title}}
        message: this.contactForm.value.message // Este  {{message}}
      }
    };

   // contacto.component.ts
  this.http.post('https://api.emailjs.com/api/v1.0/email/send', payload, { responseType: 'text' }) 
    .subscribe({
      next: () => {
        console.log('Ahora sí entra por acá!');
        this.status = 'SUCCESS';
        this.contactForm.reset();
      },
      error: (err) => {
        console.error(err);
        this.status = 'ERROR';
      }
    });
  }
}