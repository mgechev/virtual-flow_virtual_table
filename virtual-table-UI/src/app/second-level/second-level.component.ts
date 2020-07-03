import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import testData from '../testData.json';
import * as NGL from '../../../node_modules/ngl';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-second-level',
  templateUrl: './second-level.component.html',
  styleUrls: ['./second-level.component.css']
})
export class SecondLevelComponent implements OnInit {

  constructor(
    private _location: Location,
    private router: Router
  ) {
    // console.log(this.router.getCurrentNavigation().extras)
  }
  wholeData = JSON.parse(JSON.stringify(this.router.getCurrentNavigation().extras))
  testData: any = testData

  //Filters
  mwFilterHigh: any;
  mwFilterLow: any;

  slogPFilterHigh: any;
  slogPFilterLow: any;

  tpsaFilter: any;
  h_accFilter: any;
  hbdFilter: any;
  rotBFilter: any;

  validFilterKeyNamesForCheck = ["MW", "cLogP", "H_Acc", "hDonors", "tpsa", "rotable_bonds"]

  compoundBlacklist = []

  //MW
  molecularWeightRanges = {
    "0": "0",
    "1": "200",
    "2": "250",
    "3": "300",
    "4": "325",
    "5": "350",
    "6": "375",
    "7": '400',
    "8": "425",
    "9": "450",
    "10": "500",
    "11": Number.POSITIVE_INFINITY
  }

  // value: number = 5;
  mwMinValue: number = 1;
  mwMaxValue: number = this.molecularWeightRanges[Object.keys(this.molecularWeightRanges).length - 2];
  // stepsArray = []


  MWSliderOptions: Options = {
    floor: Number(this.molecularWeightRanges[0]),
    ceil: this.molecularWeightRanges[Object.keys(this.molecularWeightRanges).length - 2],
    stepsArray: [
      { value: 1, }
    ],
    // stepsArray: this.tstepsArray2,
    showTicksValues: true
  };

  //Slogp-----------------------
  partitionCoefficientRanges = {
    "0": Number.NEGATIVE_INFINITY,
    "1": "-1",
    "2": "0",
    "3": "1",
    "4": "2",
    "5": "2.5",
    "6": "3",
    "7": "3.5",
    "8": "4",
    "9": "4.5",
    "10": "5",
    "11": Number.POSITIVE_INFINITY
  }

  slogpMinValue = this.partitionCoefficientRanges[1] ? this.partitionCoefficientRanges[0] : Number.NEGATIVE_INFINITY;
  slogpMaxValue: number = this.partitionCoefficientRanges[Object.keys(this.molecularWeightRanges).length - 2];

  SlogpSliderOptions: Options = {
    floor: Number(this.slogpMinValue),
    ceil: this.slogpMaxValue,
    stepsArray: [
      // { value: 1, },
      // { value: 2, }
    ],
    // stepsArray: this.tstepsArray2,
    showTicksValues: true
  };

  //TPSA
  topologicalPolarSurfaceArea = {
    "0": "0",
    "1": "20",
    "2": "40",
    "3": "60",
    "4": "80",
    "5": "100",
    "6": "120",
    "7": "140"
  }

  //HBA or H-Acc
  hydrogenBondAcceptors = {
    "0": "0",
    "1": "1",
    "2": "3",
    "3": "5",
    "4": "7",
    "5": "9",
    "6": "10"
  }

  //HBD
  hydrogenBondDonors = {
    "0": "0",
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "inf"
  }

  //RotB
  rotableBonds = {
    "0": "0",
    "1": "1",
    "2": "3",
    "3": "5",
    "4": "7",
    "5": "9",
    "6": "10"
  }

  ngOnInit(): void {
    this.changeOptionsForMw()
    this.changeOptionsForSlogP()
    

    this.populateMoleculeViewports()
    this.mwFilterHigh = this.molecularWeightRanges[Object.keys(this.molecularWeightRanges).length - 1]
    this.slogPFilterHigh = this.partitionCoefficientRanges[Object.keys(this.partitionCoefficientRanges).length - 1]
    this.tpsaFilter = this.topologicalPolarSurfaceArea[Object.keys(this.topologicalPolarSurfaceArea).length - 1]
    this.h_accFilter = this.hydrogenBondAcceptors[Object.keys(this.hydrogenBondAcceptors).length - 1]
    this.hbdFilter = this.hydrogenBondDonors[Object.keys(this.hydrogenBondDonors).length - 1]
    this.rotBFilter = this.rotableBonds[Object.keys(this.rotableBonds).length - 1]
  }

  backClicked() {
    console.log('Clicked back')
    this.router.navigate(['/first-level'], this.wholeData);
  }

  clickedDockCompound(index: any) {
    console.log('Index clicked:', index)
    console.log(this.wholeData.level2.docked_compounds[index])
    this.router.navigate(['/third-level'], this.wholeData);
  }

  populateMoleculeViewports() {
    setTimeout(() => {
      // Object.keys(this.wholeData).forEach(item => {
      // console.log('item: ',item)
      var stage = new NGL.Stage("secondLevelviewport" + '1');
      window.addEventListener("resize", function (event) {
        stage.handleResize();
      }, true);
      stage.loadFile("rcsb://1crn", { defaultRepresentation: true });
      // })
    }, 1);
  }

  asIsOrder(a, b) {
    return 1;
  }

  onSliderChange(input: any, filterName?: any) {
    console.log()
    // if (filterName == 'MWSlider') {
    //   this.mwFilterHigh = this.molecularWeightRanges[Number(input.value) - 1];
    // }
    // if (filterName == 'SlogP') {
    //   this.slogPFilter = this.partitionCoefficientRanges[Number(input.value) - 1];
    // }
    // if (filterName == 'tpsa') {
    //   this.tpsaFilter = this.topologicalPolarSurfaceArea[Number(input.value) - 1];
    // }
    // if (filterName == 'h-acc') {
    //   this.h_accFilter = this.hydrogenBondAcceptors[Number(input.value) - 1];
    // }
    // if (filterName == 'hbd') {
    //   this.hbdFilter = this.hydrogenBondDonors[Number(input.value) - 1];
    // }
    // if (filterName == 'rotB') {
    //   this.rotBFilter = this.rotableBonds[Number(input.value) - 1];
    // }
    // this.validateCompounds()
  }

  validateCompounds() {
    // console
    // var compoundValid = true;
    Object.keys(this.wholeData.level2.docked_compounds).forEach(item => {
      var compoundValid = true;
      // console.log('????',this.wholeData.level2.docked_compounds[item])

      var compoundUnderReview = this.wholeData.level2.docked_compounds[item]
      // console.log('compoundUnderReview:', compoundUnderReview);
      //compound:{}
      // console.log(this.wholeData.level2.docked_compounds[item])

      // console.log('--------')
      Object.keys(compoundUnderReview).forEach(compoundDetail => {
        //mw,cLog,etc

        if (this.validFilterKeyNamesForCheck.includes(compoundDetail)) {
          //Checking filter key here
          // console.log('Checking:', compoundDetail)
          // console.log(compoundDetail)
          //Checking filter value here
          if (compoundDetail == 'MW') {
            console.log('compoundUnderReview[compoundDetail]:', compoundUnderReview[compoundDetail])
            if (compoundUnderReview[compoundDetail] > this.mwFilterHigh && this.mwFilterLow < compoundUnderReview[compoundDetail]) {
              compoundValid = false;
              console.log('MW Broke!' + compoundUnderReview[compoundDetail] + ' > ' + this.mwFilterHigh);
            }
          }
          if (compoundDetail == 'cLogP') {
            if (compoundUnderReview[compoundDetail] > this.slogPFilterHigh && this.slogPFilterLow < compoundUnderReview[compoundDetail]) {
              compoundValid = false;
              console.log('cLogP Broke!')
            }
          }
          if (compoundDetail == 'H_Acc') {
            if (compoundUnderReview[compoundDetail] > this.h_accFilter) {
              // console.log('compoundUnderReview[compoundDetail]: ' + compoundUnderReview[compoundDetail])

              console.log('this.h_accFilter: ' + this.h_accFilter)
              console.log('h-acc Broke!')
              compoundValid = false;
            }
          }
          if (compoundDetail == 'hDonors') {
            if (compoundUnderReview[compoundDetail] > this.hbdFilter) {
              console.log('h-acc Broke!')
              compoundValid = false;
            }
          }
          if (compoundDetail == 'tpsa') {
            if (compoundUnderReview[compoundDetail] > this.tpsaFilter) {
              console.log('tpsa Broke!')
              compoundValid = false;
            }
          }
          if (compoundDetail == 'rotable_bonds') {
            if (compoundUnderReview[compoundDetail] > this.rotBFilter) {
              console.log('tpsa Broke!')
              compoundValid = false;
            }
          }
        }

      })
      if (!compoundValid) {
        this.compoundBlacklist.indexOf(compoundUnderReview.compound_identifier) === -1 ? this.compoundBlacklist.push(compoundUnderReview.compound_identifier) : null;

      } else {
        this.compoundBlacklist = this.compoundBlacklist.filter(item => { return item != compoundUnderReview.compound_identifier })
      }
      // console.log('Blacklst', this.compoundBlacklist)
    })
  }

  lowValueChange(value: any, label: any) {
    console.log('low change:' + value + ' ' + label)
    if (label == 'MWSlider') {
      this.mwFilterLow = value;
    }
    if (label == 'SlogP') {
      this.slogPFilterLow = value
    }
    this.validateCompounds()
  }

  highValueChange(value: any, label: any) {
    console.log('high change:' + value + ' ' + label)
    if (label == 'MWSlider') {
      this.mwFilterHigh = value
    }
    if (label == 'SlogP') {
      this.slogPFilterHigh = value
    }
    this.validateCompounds()
  }

  changeOptionsForMw() {
    const newOptions: Options = Object.assign({}, this.MWSliderOptions);
    var tstepsArray2 = []
    Object.keys(this.molecularWeightRanges).forEach(element => {
      tstepsArray2.push({ value: this.molecularWeightRanges[element] })
    });
    newOptions.stepsArray = tstepsArray2;
    this.MWSliderOptions = newOptions;
  }

  changeOptionsForSlogP() {
    const slogpOptions: Options = Object.assign({}, this.SlogpSliderOptions);
    var SlogpSliderOptionsArray = []
    Object.keys(this.partitionCoefficientRanges).forEach(element => {
      SlogpSliderOptionsArray.push({ value: this.partitionCoefficientRanges[element] })
    });
    slogpOptions.stepsArray = SlogpSliderOptionsArray;
    this.SlogpSliderOptions = slogpOptions;
  }
}
