import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cotizacion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cotizacion.component.html',
  styleUrl: './cotizacion.component.scss'
})
export class CotizacionComponent implements OnInit {
  quoteForm!: FormGroup;
  
  readonly BASE_PRICE = 85000; 
  readonly BASE_MAINTENANCE = 50000;

  readonly EXTRA_SECTION_PRICE = 15000;
  readonly MAINTENANCE_PER_SECTION = 5000;

  readonly EBOOK_SECTION_PRICE = 25000;
  readonly EMAIL_SETUP_PRICE = 10000;
  readonly ANALYTICS_SETUP_PRICE = 25000;

  readonly EMAIL_MONTHLY_PRICE = 15000;
  readonly ANALYTICS_MONTHLY_PRICE = 10000;

  totalOneTime = this.BASE_PRICE;
  totalMonthly = this.BASE_MAINTENANCE;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.quoteForm = this.fb.group({
      extraSections: [0],
      emailService: [false],
      ebookSystem: [false],
      bookingSystem: [false],
      guidedChatbot: [false],
      analyticsDashboard: [false]
    });

    this.quoteForm.valueChanges.subscribe(() => this.calculateTotal());
    this.quoteForm.get('guidedChatbot')?.disable();
    this.quoteForm.get('bookingSystem')?.disable();
  }

  updateSections(val: number) {
    const current = this.quoteForm.get('extraSections')?.value || 0;
    const newValue = Math.max(0, current + val);
    this.quoteForm.patchValue({ extraSections: newValue });
  }

  calculateTotal() {
    const v = this.quoteForm.value;
    let oneTime = this.BASE_PRICE;
    let monthly = this.BASE_MAINTENANCE;

    // Lógica de Pago Único (Setup)
    oneTime += (v.extraSections * this.EXTRA_SECTION_PRICE);
    if (v.ebookSystem) oneTime += this.EBOOK_SECTION_PRICE;
    if (v.emailService) oneTime += this.EMAIL_SETUP_PRICE;
    if (v.analyticsDashboard) oneTime += this.ANALYTICS_SETUP_PRICE;

    // Lógica Mensual (Mantenimiento)
    if (v.emailService) monthly += this.EMAIL_MONTHLY_PRICE;
    if (v.analyticsDashboard) monthly += this.ANALYTICS_MONTHLY_PRICE;
    monthly += (v.extraSections * this.MAINTENANCE_PER_SECTION);

    this.totalOneTime = oneTime;
    this.totalMonthly = monthly;
  }
}