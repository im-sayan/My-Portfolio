import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CardComponent } from '../card/card.component';
import { Card } from '../_models/card';
import { Tag } from '../_models/tags';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css',
  providers: []
})
export class PortfolioComponent {

  projects: Card[] = [
    {
      id: 1,
      name: 'Portfolio',
      summary: 'A responsive and static portfolio website designed and developed by Sayan De.',
      description: 'This portfolio is a static and responsive web application built using Angular, showcasing my skills and projects as a software developer. The design and development of this portfolio aimed to provide a seamless user experience across different devices while highlighting various aspects of my professional journey. The potfolio has sections of home, about, skill & experience, projects and contact information. Key features are its responsive design and modern aesthetics.',
      projectLink: 'https://github.com/im-sayan/My-Portfolio',
      tags: [Tag.ANGULAR,Tag.JAVASCRIPT, Tag.HTML5, Tag.CSS3],
      pictures: ["../../assets/Screenshot from 2024-09-19 21-01-18.png","../../assets/Screenshot from 2024-09-19 21-01-29.png"]
    },
    {
      id: 2,
      name: 'Weather Forcast App',
      summary: 'A responsive and dynamic weather forcating web app designed and developed by Sayan De.',
      description: 'This weather application is a dynamic and responsive web application built using Angular, i used third party api to get the forcasting for today and upcoming 5 days and user can also search any location data even also get weather of their current location by navigate their location, and user can also get details information about current as well as upcomeing 5 days hourly forcasting report. I have tried to make the design responsive and modern aesthetics. anybody can vesite my github profile and explore my project here is the  github link-: https://github.com/im-sayan/Weather-App',
      projectLink: 'https://github.com/im-sayan/Weather-App',
      tags: [Tag.ANGULAR,Tag.JAVASCRIPT, Tag.HTML5, Tag.CSS3],
      pictures: ["../../assets/Screenshot from 2024-09-15 20-53-35.png","../../assets/Screenshot from 2024-09-15 20-53-51.png","../../assets/Screenshot from 2024-09-15 20-53-57.png"]
    },
    {
      id: 3,
      name: 'QR-Code Genarator',
      summary: 'This is a QR code generator that converts any input value into a QR code. developed by Sayan De.',
      description: 'This is a QR code generator built with node js that converts any input value into a QR code.',
      projectLink: 'https://github.com/im-sayan/QR-Code-Genarator',
      tags: [Tag.JAVASCRIPT, Tag.NODEJS],
      pictures: ["../../assets/no-image-icon-23494.png"]
    },
    {
      id: 4,
      name: 'Language Translator',
      summary: 'A language Translator developed by Sayan De.',
      description: `This is a small script to translate a language into another language, we can use it in any kind of project where it's needed`,
      projectLink: 'https://github.com/im-sayan/language-Translator',
      tags: [Tag.JAVASCRIPT, Tag.NODEJS],
      pictures: ["../../assets/no-image-icon-23494.png"]
    },
    {
      id: 5,
      name: 'DNS Record Finder',
      summary: 'A Script to retrive DNS record of a domain, developed by Sayan De.',
      description: `This project is a DNS Record Finder designed to extract and analyze DNS records for any given website URL. The primary purpose of this script is to provide a tool for checking DNS data and verifying the authenticity of websites.

In today’s digital landscape, phishing attacks and other forms of cyber threats have become increasingly sophisticated, posing significant risks to systems and users. By leveraging this tool, users can enhance their security posture by examining DNS records, which can help identify potential threats and verify the legitimacy of a website.`,
      projectLink: 'https://github.com/im-sayan/DNS-Record-Finder',
      tags: [Tag.JAVASCRIPT, Tag.NODEJS],
      pictures: ["../../assets/no-image-icon-23494.png"]
    },
    {
      id: 6,
      name: 'Port Scanner',
      summary: 'A simple port scanner of an ip or a domain, developed by Sayan De.',
      description: `This is a small script build for security check purpose of a web application, which ensure that unwanted or vaulnarable ports opened for the applicantion that can harm the application.`,
      projectLink: 'https://github.com/im-sayan/Port-Scanner',
      tags: [Tag.JAVASCRIPT, Tag.NODEJS],
      pictures: ["../../assets/no-image-icon-23494.png"]
    },
    {
      id: 7,
      name: 'Random Customize Password Genarator',
      summary: 'A customize randon passwordgenarator, developed by Sayan De.',
      description: `This is a small script to genarate customize random password`,
      projectLink: 'https://github.com/im-sayan/customize-randon-password-genarator',
      tags: [Tag.JAVASCRIPT, Tag.NODEJS],
      pictures: ["../../assets/no-image-icon-23494.png"]
    },
    {
      id: 8,
      name: 'Retrive Phone Number Information',
      summary: 'A small script to retrive the phone number information, developed by Sayan De.',
      description: `This is a small script to retrive the phone number information, use it only for educational perpose`,
      projectLink: 'https://github.com/im-sayan/PhoneNumber-information',
      tags: [Tag.PYTHON],
      pictures: ["../../assets/no-image-icon-23494.png"]
    },
  ]


  constructor(private titleService: Title) {
    this.titleService.setTitle('Projects')
  }

  trackById(index: number, project: Card): number {
    return project.id;
  }

}
