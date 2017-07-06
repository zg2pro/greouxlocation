import {Component, OnInit, Compiler, ReflectiveInjector, ViewContainerRef, ModuleWithComponentFactories} from '@angular/core';
import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {ROUTES} from './navbar-routes.config';
import {MenuType} from './navbar.metadata';
import {TitleHome} from '../home/title/title.component';
import {NavbarModule} from './navbar.module';
//import {I18NService} from '../i18n.service';



//@Pipe({
//    name: 'sanitizeHtml'
//})
//class SanitizeHtml implements PipeTransform {
//
//    constructor(private _sanitizer: DomSanitizer) {}
//
//    transform(html: string): SafeHtml {
//        return this._sanitizer.bypassSecurityTrustHtml(html);
//    }
//}

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    public menuItems: any[];
    public brandMenu: any;
    isCollapsed = true;

    fullImagePath: string;
    factory: ModuleWithComponentFactories<NavbarModule>;

    constructor() {
        this.fullImagePath = 'assets/img/ind_sight_of_greoux.jpg';
    }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem.menuType !== MenuType.BRAND);
        this.brandMenu = ROUTES.filter(menuItem => menuItem.menuType === MenuType.BRAND)[0];
        ;
     //  this.brandMenu.title = this.i18nService.get("mainTitle");
//        if (!this.factory) {
//            const dynamicComponents = {
//                titleHome: {comp: TitleHome}
//            };
//            this.compiler.compileModuleAndAllComponentsAsync(NavbarModule)
//                .then((moduleWithComponentFactories: ModuleWithComponentFactories<NavbarModule>) => {
//                    this.factory = moduleWithComponentFactories;
//                    Object.keys(dynamicComponents).forEach(k => {
//                        this.add(dynamicComponents[k]);
//                    });
//                });
//        }
    }

//    add(comp: any) {
//        const compFactory = this.factory.componentFactories.find(x => x.componentType === comp.comp);
//        // If we don't want to hold a reference to the component type, we can also say: const compFactory = this.factory.componentFactories.find(x => x.selector === 'my-component-selector');
//        const injector = ReflectiveInjector.fromResolvedProviders([], this.vcRef.parentInjector);
//        const cmpRef = this.vcRef.createComponent(compFactory, this.vcRef.length, injector, []);
//        Object.keys(comp.inputs).forEach(i => cmpRef.instance[i] = comp.inputs[i]);
//    }

    public getMenuItemClasses(menuItem: any) {
        return {
            'pull-xs-right': this.isCollapsed && menuItem.menuType === MenuType.RIGHT
        };
    }


}