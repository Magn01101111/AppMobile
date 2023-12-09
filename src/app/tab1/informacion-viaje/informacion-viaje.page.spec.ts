import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InformacionViajePage } from './informacion-viaje.page';

describe('InformacionViajePage', () => {
  let component: InformacionViajePage;
  let fixture: ComponentFixture<InformacionViajePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InformacionViajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
