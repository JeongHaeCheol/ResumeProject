import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];
    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public barChartLabels: string[] = [
        '2012',
        '2013',
        '2014',
        '2015',
        '2016',
        '2017',
        '2018'
    ];
    public barChartType: string = 'bar';
    public barChartLegend: boolean = true;

    public barChartData: any[] = [
        { data: [65, 59, 80, 81, 56, 55, 40], label: '표본 A' },
        { data: [28, 48, 40, 19, 86, 27, 90], label: '표본 B' }
    ];

    public doughnutChartLabels: string[] = [
        '설문결과 1번',
        '설문결과 2번',
        '설문결과 3번'
    ];
    public doughnutChartData: number[] = [350, 450, 100];
    public doughnutChartType: string = 'doughnut';

    constructor() {
        this.sliders.push(
            {
                imagePath: 'assets/images/news1.jpg' ,
                
    
                label: '',
                text:
                    'http://w21.datanews.co.kr/site/sslife/DTWork.asp?itemIDT=1002805&NsID=&aID=20160414134117790&page=',
            },
            {
                imagePath: 'assets/images/news2.jpg',
                label: '',
                text: 'http://www.datasom.co.kr/stat/news.do?id=20160329133437973'
            },
            {
                imagePath: 'assets/images/news3.jpg',
                label: '',
                text:
                    'http://www.ajou.ac.kr/biz/development/dev03_01.jsp?mode=view&article_no=88805'
            }
        );
       

        this.alerts.push(
            {
                id: 1,
                type: 'success',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            },
            {
                id: 2,
                type: 'warning',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            }
        );
    }

    ngOnInit() {}

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }

    public randomize(): void {
        // Only Change 3 values
        const data = [
            Math.round(Math.random() * 100),
            59,
            80,
            Math.random() * 100,
            56,
            Math.random() * 100,
            40
        ];
        const clone = JSON.parse(JSON.stringify(this.barChartData));
        clone[0].data = data;
        this.barChartData = clone;
        /**
         * (My guess), for Angular to recognize the change in the dataset
         * it has to change the dataset variable directly,
         * so one way around it, is to clone the data, change it and then
         * assign it;
         */
    }
}
