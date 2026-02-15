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
  contactForm!: FormGroup; 
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
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      subject: ['', [Validators.required, Validators.minLength(3)]],
      message: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      console.log('Formulario inválido:', this.contactForm.controls);
      return;
    }

    this.status = 'SENDING';
    const endpoint = 'https://formspree.io/f/tu_id_aca'; 

    this.http.post(endpoint, this.contactForm.value).subscribe({
      next: () => {
        this.status = 'SUCCESS';
        this.contactForm.reset();
        setTimeout(() => this.status = 'IDLE', 5000);
      },
      error: () => {
        this.status = 'ERROR';
      }
    });
  }
}