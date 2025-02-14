import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisosComponent } from './avisos.component';

describe('AvisosComponent', () => {
  let component: AvisosComponent;
  let fixture: ComponentFixture<AvisosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvisosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvisosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
