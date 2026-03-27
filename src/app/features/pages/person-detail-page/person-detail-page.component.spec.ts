import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonDetailPageComponent } from './person-detail-page.component';

describe('PersonDetailPageComponent', () => {
  let component: PersonDetailPageComponent;
  let fixture: ComponentFixture<PersonDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonDetailPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
