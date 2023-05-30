export const fetchHeaders = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

export function getMyIP() {
    fetch('https://api.ipify.org/?format=json')
    .then((res) => res.json())
    .then((data) => {localStorage.setItem("ip", data.ip)})
}