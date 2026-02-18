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
  
  // Precios base
  readonly BASE_PRICE = 60000;
  readonly BASE_MAINTENANCE = 50000;
  readonly EXTRA_SECTION_PRICE = 15000;
  readonly EBOOK_SECTION_PRICE = 25000;
  readonly BOOKING_PRICE = 30000;
  readonly CHATBOT_PRICE = 20000;

  // Nuevas constantes de mantenimiento extra
  readonly MAINTENANCE_PER_SECTION = 5000; // <--- Lo que pediste

  totalOneTime = this.BASE_PRICE;
  totalMonthly = this.BASE_MAINTENANCE;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // pasa a init fomr el formualrio

    this.quoteForm = this.fb.group({
      extraSections: [0],
      emailService: [false],
      seoOptimization: [false],
      ebookSystem: [false],
      bookingSystem: [false],
      guidedChatbot: [false],
    });

    this.quoteForm.valueChanges.subscribe(() => this.calculateTotal());
  
    this.quoteForm.get('guidedChatbot')?.disable();
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

    // Lógica de Pago Único
    oneTime += (v.extraSections * this.EXTRA_SECTION_PRICE);
    if (v.seoOptimization) oneTime += 15000;
    if (v.ebookSystem) oneTime += this.EBOOK_SECTION_PRICE;
    if (v.bookingSystem) oneTime += this.BOOKING_PRICE;
    if (v.guidedChatbot) oneTime += this.CHATBOT_PRICE;

    // Lógica Mensual (Mantenimiento)
    if (v.emailService) monthly += 15000;
    if (v.bookingSystem) monthly += 10000;

    // Sumamos el mantenimiento por cada sección extra
    monthly += (v.extraSections * this.MAINTENANCE_PER_SECTION);

    this.totalOneTime = oneTime;
    this.totalMonthly = monthly;
  }
}