import { keyframes, style, AnimationStyleMetadata } from "@angular/animations";


export const slideOutLeft:AnimationStyleMetadata[] = [
    style({transform: 'translate3d(0, 0, 0)', offset: 0}),
    style({transform: 'translate3d(-150%, 0, 0)', opacity: 0, animationFillMode:'forwards', offset: 1}),
]