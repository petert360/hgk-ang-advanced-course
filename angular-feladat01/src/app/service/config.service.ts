import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  apiUrl = 'http://localhost:3000/';

  navigation: { label: string, href: string, role: number }[] = [
    { label: 'Home', href: '', role: 1 },
    { label: 'Editor', href: '/editor', role: 2 },
    { label: 'Admin', href: '/admin', role: 3 },
    { label: 'Login', href: '/login', role: 1 },
  ];

  constructor() { }
}
