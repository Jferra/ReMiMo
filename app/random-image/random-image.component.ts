///<reference path="../../node_modules/tns-core-modules/declarations.d.ts"/>
import {Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Gif } from "nativescript-gif";
import { registerElement } from "nativescript-angular/element-registry";

import { RandomImageService } from "./random-image.service";
import { Observable } from "rxjs";

registerElement("Gif", () => require("nativescript-gif").Gif );

@Component({
    moduleId: module.id,
    selector: 'random-image',
    templateUrl: 'random-image.component.html',
    providers: [ RandomImageService ]
})
export class RandomImageComponent implements OnInit {
  imageSrc$: Observable<string>;

  @ViewChild('testGif')
  private imageElement: ElementRef;

  constructor(private randomImageService:RandomImageService) {}

  ngOnInit(): void {
    this.imageSrc$ = this.randomImageService.getImage();
  }

  onGifLoaded(): void{
    console.log("onGifLoaded");
  }

}
