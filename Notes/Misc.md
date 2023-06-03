# creators 
HTML - 1980, Tim Berners-Lee created HTML  
CSS - 1994 by Håkon Wium Lie created CSS  
JavaScript - 1995 Netscape led by Brendan Eich created Java Script 

# Midterm mistakes 
1. ```<!DOCTYPE html>``` means Directs the browser to use relevant specifications when rendering the HTML     
2. It is possible to add new properties to a JavaScript object dynamically,
```
squirrel = { hungry: true, sleeping: false };
squirrel.hasEaten = false;
```

3. Given the following HTML, what JavaScript could you use to set the text "yes" to "cow" and leave the "no" text unaffected?
```
<p>no</p>
<p class="demo">yes</p>
<div class="demo">no</div>
Answer: document.querySelector("p.demo").textContent = "cow"; 
```

4. What does the console command chmod do?-  Changes a file's mode bits to control the access rights to a file.    
5. Port 443 is reserved for which protocol? - HTTP 
6. What will the following code output when executed?
```
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
     console.log('banana')
     resolve(true);
  }, 10000);
});
console.log('ski');

p.then((result) => console.log('fish'));

console.log('taco');
Answer: ski taco banana fish 
```

7. What will the following code output when executed?
```
const p = new Promise((resolve, reject) => {
  reject(false);
});

p
.then((a) => console.log('A'))
.then((b) => console.log('B'))
.catch((c) => console.log('C'))
.finally(() => console.log('D'));
Answer: C D 
```
