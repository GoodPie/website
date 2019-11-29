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
    transition('* => isLeft' , slideTo('right')),
    transition('* => isRight', slideTo('left')),
    transition('isRight => *', slideTo('left')),
    transition('isLeft => *', slideTo('right'))
  ]);


function slideTo(direction) {
  const optional = {optional: true}
  return [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: '65px',
        [direction]: 0,
        width: '100%'
      })
    ], optional),
    query(':enter', [
      style({[direction] : '-100%'})
    ]),
    group([
      query(':leave', [
        animate('500ms ease', style({[direction]: '100%'}))
      ], optional),
      query(':enter', [
        animate('500ms ease', style({[direction]: '0%'}))
      ])
    ])
  ];
}
