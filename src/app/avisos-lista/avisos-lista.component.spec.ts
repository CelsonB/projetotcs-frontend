import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisosListaComponent } from './avisos-lista.component';

describe('AvisosListaComponent', () => {
  let component: AvisosListaComponent;
  let fixture: ComponentFixture<AvisosListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvisosListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvisosListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
