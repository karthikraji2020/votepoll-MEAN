import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotepollComponent } from './votepoll.component';

describe('VotepollComponent', () => {
  let component: VotepollComponent;
  let fixture: ComponentFixture<VotepollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotepollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotepollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
