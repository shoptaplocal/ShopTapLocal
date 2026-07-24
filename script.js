const menu=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav-links');

menu.addEventListener('click',()=>{
  const open=nav.classList.toggle('open');
  menu.setAttribute('aria-expanded',String(open));
});

document.querySelectorAll('.nav-links a').forEach(a=>{
  a.addEventListener('click',()=>{
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded','false');
  });
});

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
},{threshold:.1});

document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

document.querySelectorAll('[data-product]').forEach(link=>{
  link.addEventListener('click',()=>{
    const select=document.getElementById('productSelect');
    const target=link.dataset.product;
    [...select.options].forEach(option=>{
      if(option.text===target) select.value=option.value;
    });
  });
});

document.getElementById('year').textContent=new Date().getFullYear();

const form=document.getElementById('orderForm');
const status=document.getElementById('formStatus');

form.addEventListener('submit',event=>{
  event.preventDefault();
  const data=new FormData(form);

  const subject=encodeURIComponent(`TapLocal Order Request - ${data.get('product')}`);
  const body=encodeURIComponent(
`Name: ${data.get('name')}
Business: ${data.get('business') || 'Not provided'}
Email: ${data.get('email')}
Phone: ${data.get('phone') || 'Not provided'}
Product: ${data.get('product')}
Destination: ${data.get('destination')}

Project details:
${data.get('details') || 'No additional details'}`
  );

  status.textContent='Opening your email app...';
  window.location.href=`mailto:shop.taplocal@gmail.com?subject=${subject}&body=${body}`;
});

const industrySelect=document.getElementById('industrySelect');
const typeSelect=document.getElementById('typeSelect');
const ctaSelect=document.getElementById('ctaSelect');
const preview=document.getElementById('configPreview');
const previewLogo=document.getElementById('previewLogo');
const previewBusiness=document.getElementById('previewBusiness');
const previewType=document.getElementById('previewType');
const previewCta=document.getElementById('previewCta');

const industryData={
  detailer:{logo:'CD',business:'COASTAL DETAILING'},
  restaurant:{logo:'BI',business:'BELLA ITALIA'},
  barber:{logo:'FK',business:'FADE KINGS'},
  realtor:{logo:'SJ',business:'SARAH JOHNSON REALTY'},
  salon:{logo:'LB',business:'LUXE BEAUTY'},
  fitness:{logo:'IF',business:'IRON FORGE FITNESS'}
};

function updatePreview(){
  const industry=industrySelect.value;
  const item=industryData[industry];
  preview.className='config-preview '+industry;
  previewLogo.textContent=item.logo;
  previewBusiness.textContent=item.business;
  previewType.textContent='CUSTOM '+typeSelect.options[typeSelect.selectedIndex].text.toUpperCase();
  previewCta.textContent=ctaSelect.value.toUpperCase();
}

[industrySelect,typeSelect,ctaSelect].forEach(el=>el.addEventListener('change',updatePreview));
updatePreview();
