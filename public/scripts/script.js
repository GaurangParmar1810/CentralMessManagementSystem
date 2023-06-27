document.addEventListener('DOMContentLoaded', function() {
    // Check if the theme preference cookie exists
    const themePreference = getCookie('themePreference');
  
    if (themePreference === '') {
      // Cookie not found, create one with default preference for dark theme
        setThemePreferenceCookie('dark');
        applyDarkTheme();
    } 
    else 
    {
        // Cookie found, apply the theme based on the preference
        if (themePreference === 'dark') 
        {
            applyDarkTheme();
        } 
        else 
        {
            applyLightTheme();
        }
    }
});

function getCookie(name) 
{
    const cookieString = document.cookie;
    const cookies = cookieString.split(';');

    for (let i = 0; i < cookies.length; i++) 
    {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) 
        {
            return cookie.substring(name.length + 1);
        }
    }
    return '';
}

function setThemePreferenceCookie(themePreference) 
{
    const maxAge = 3600; // Specify the desired maxAge for the cookie in seconds
    document.cookie = `themePreference=${themePreference}; max-age=${maxAge}; path=/`;
}

function applyDarkTheme() 
{
    // Apply dark theme styles to the page elements
    const body = document.body;
    const navBar = document.querySelector('.sticky-top');
    const footer = document.querySelector('footer');

    body.setAttribute('data-bs-theme', 'dark');
    navBar.setAttribute('data-bs-theme', 'dark');
    footer.setAttribute('data-bs-theme', 'dark');
    
    if (footer.classList.contains('bg-light')) 
    {
        footer.classList.remove('bg-light');
    }
    footer.classList.add('bg-dark');

    // Update the theme toggle button icon
    const moonIcon = document.querySelector('.fa-moon');
    const sunIcon = document.querySelector('.fa-sun');

    moonIcon.classList.add('hidden');
    sunIcon.classList.remove('hidden');
}

function applyLightTheme() 
{
    // Apply light theme styles to the page elements
    const body = document.body;
    const navBar = document.querySelector('.sticky-top');
    const footer = document.querySelector('footer');

    body.setAttribute('data-bs-theme', 'light');
    navBar.setAttribute('data-bs-theme', 'light');
    footer.setAttribute('data-bs-theme', 'light');
    
    if (footer.classList.contains('bg-dark')) 
    {
        footer.classList.remove('bg-dark');
    }
    footer.classList.add('bg-light');

    // Update the theme toggle button icon
    const moonIcon = document.querySelector('.fa-moon');
    const sunIcon = document.querySelector('.fa-sun');

    moonIcon.classList.remove('hidden');
    sunIcon.classList.add('hidden');
}
  
function toggleDarkMode() 
{
    const body = document.body;
    const navBar = document.querySelector('.sticky-top');
    const footer = document.querySelector('footer');
  
    if (body.getAttribute('data-bs-theme') === 'dark') 
    {
        // Switch to light theme
        body.setAttribute('data-bs-theme', 'light');
        navBar.setAttribute('data-bs-theme', 'light');
        footer.setAttribute('data-bs-theme', 'light');
        if (footer.classList.contains('bg-dark')) 
        {
            footer.classList.remove('bg-dark');
        }
        footer.classList.add('bg-light');
        setThemePreferenceCookie('light');
    } 
    else 
    {
      // Switch to dark theme
        body.setAttribute('data-bs-theme', 'dark');
        navBar.setAttribute('data-bs-theme', 'dark');
        footer.setAttribute('data-bs-theme', 'dark');
        if (footer.classList.contains('bg-light')) {
            footer.classList.remove('bg-light');
        }
        footer.classList.add('bg-dark');
        setThemePreferenceCookie('dark');
    }
  
    const moonIcon = document.querySelector('.fa-moon');
    const sunIcon = document.querySelector('.fa-sun');
  
    moonIcon.classList.toggle('hidden');
    sunIcon.classList.toggle('hidden');
}
  