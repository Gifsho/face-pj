import { RouterModule, Routes } from '@angular/router';


import { HomeComponent } from './components/home/home.component';
import { PostsComponent } from './components/posts/posts.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ToptenComponent } from './components/topten/topten.component';
import { GraphComponent } from './graph/graph.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MainComponent } from './setting/main/main.component';
import { AddimagesComponent } from './setting/addimages/addimages.component';


export const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "posts", component: PostsComponent },
    { path: "login", component: LoginComponent },
    { path: "signup", component: SignupComponent },
    { path: "topten", component: ToptenComponent },
    { path: "toptennull", component: ToptenComponent },
    { path: "graph", component: GraphComponent },
    { path: "dashboard", component: DashboardComponent },
    { path: "main", component: MainComponent},
    { path: "add-img", component: AddimagesComponent},
    { path: "**", redirectTo: "" },
];
