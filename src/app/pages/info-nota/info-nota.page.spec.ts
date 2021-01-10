import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfoNotaPage } from './info-nota.page';

describe('InfoNotaPage', () => {
  let component: InfoNotaPage;
  let fixture: ComponentFixture<InfoNotaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoNotaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InfoNotaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
