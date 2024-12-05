import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscardMatchesComponent } from './discard-matches.component';

describe('DiscardMatchesComponent', () => {
  let component: DiscardMatchesComponent;
  let fixture: ComponentFixture<DiscardMatchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscardMatchesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiscardMatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
