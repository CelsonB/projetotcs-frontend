import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDePerfisComponent } from './lista-de-perfis.component';

describe('ListaDePerfisComponent', () => {
  let component: ListaDePerfisComponent;
  let fixture: ComponentFixture<ListaDePerfisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaDePerfisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaDePerfisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
