# Définis le chemin vers ton dossier Cumulus MX
$source = "C:\CumulusMX\web\realtime.txt"
$destination = ".\realtime.txt"

# Copie le fichier realtime.txt le plus récent de Cumulus MX ici
Copy-Item $source $destination -Force

# Envoie les modifications sur GitHub
git add realtime.txt
git commit -m "Mise auto meteo : $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
git push origin principal