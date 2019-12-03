import {
  trigger,
  transition,
  style,
  query,
  group,
  animate,
} from '@angular/animations';

export const slider =
  trigger('routeAnimations', [
      transition('* => isLeft', [
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: '64px',
            left: 0,
            width: '100%'
          })
        ], { optional: true }),
        query(':enter', [
          style({ left: '-100%'})
        ]),
        group([
          query(':leave', [
            animate('500ms ease', style({ left: '100%'}))
          ], { optional: true }),
          query(':enter', [
            animate('500ms ease', style({ left: '0%'}))
          ])
        ]),
      ]),
      transition('* => isRight', [
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: '64px',
            right: 0,
            width: '100%'
          })
        ], { optional: true }),
        query(':enter', [
          style({ right: '-100%'})
        ]),
        group([
          query(':leave', [
            animate('500ms ease', style({ right: '100%'}))
          ], { optional: true }),
          query(':enter', [
            animate('500ms ease', style({ right: '0%'}))
          ])
        ]),
      ]),
      transition('isRight => *', [
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: '64px',
            right: 0,
            width: '100%'
          })
        ], { optional: true }),
        query(':enter', [
          style({ left: '-100%'})
        ]),
        group([
          query(':leave', [
            animate('500ms ease', style({ left: '100%'}))
          ], { optional: true }),
          query(':enter', [
            animate('500ms ease', style({ left: '0%'}))
          ])
        ]),
      ]),
      transition('isLeft => *', [
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: '64px',
            right: 0,
            width: '100%'
          })
        ], { optional: true }),
        query(':enter', [
          style({ right: '-100%'})
        ]),
        group([
          query(':leave', [
            animate('500ms ease', style({ right: '100%'}))
          ], { optional: true }),
          query(':enter', [
            animate('500ms ease', style({ right: '0%'}))
          ])
        ]),
      ])
    ],
  );
