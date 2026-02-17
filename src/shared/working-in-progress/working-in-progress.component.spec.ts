import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingInProgressComponent } from './working-in-progress.component';

describe('WorkingInProgressComponent', () => {
  let component: WorkingInProgressComponent;
  let fixture: ComponentFixture<WorkingInProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkingInProgressComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkingInProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
