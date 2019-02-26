import {
          Component, OnInit, ElementRef, Input, OnChanges, ViewChild,
          ViewEncapsulation, ViewChildren, ContentChildren, ContentChild
       } from '@angular/core';
import * as d3 from 'd3';
import { DataModel} from '../data/data.model';
import { svg, scaleLinear, max, scaleBand, axisLeft, axisBottom, axisTop } from 'd3';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnChanges, OnInit {
  @ViewChild('chart')
  private chartContainer: ElementRef;

  @Input()
  data: [];

  margin = {top: 20, right: 20, bottom: 30, left: 40};

  constructor() { }

  ngOnChanges() {
    if (!this.data) {
      return;
    }
    this.createChart();
  }
  private createChart() {
    // d3.select('svg').remove();
    const element = this.chartContainer.nativeElement;
    const data = this.data;
    const width = element.offsetWidth;
    const height = element.offsetHeight;
    const margin = {left: 20, right: 20, top: 20, bottom: 20 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const svgElem = d3.select(element).append('svg')
    .attr('width', width)
    .attr('height', 450);

    const render = chartData => {
      const xScale = scaleLinear()
        .domain([0, max(chartData, d => parseFloat(d['frequency']))])
        .range([0, innerWidth]);
      const yScale = scaleBand()
        .domain(chartData.map(d => d.letter))
        .range([0, 400])
        .padding(0.2);
      const yAxis = axisLeft(yScale);
      const xAxis = axisTop(xScale);
      const g = svgElem.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);
      yAxis(g.append('g'));
      xAxis(g.append('g'));
      g.selectAll('rect').data(chartData)
      .enter().append('rect')
      .attr('y', d => yScale(d['letter']))
      .attr('width', d => xScale(parseFloat(d['frequency'])))
      .attr('height', d => yScale.bandwidth());
    };
    render(data);
  }
  ngOnInit() {
  }


}
