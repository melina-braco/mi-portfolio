import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsDashboardComponent } from './analitycs-dashboard.component';

describe('EstadisticasComponent', () => {
  let component: AnalyticsDashboardComponent;
  let fixture: ComponentFixture<AnalyticsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyticsDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnalyticsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
