"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { FolderOpen, Download, Check } from "lucide-react"

interface Folder {
  id: string
  name: string
  path: string
  size: string
}

const folders: Folder[] = [
  { id: "desktop", name: "Desktop", path: "C:\\Users\\User\\Desktop", size: "245 MB" },
  { id: "documents", name: "Documents", path: "C:\\Users\\User\\Documents", size: "1.2 GB" },
  { id: "pictures", name: "Pictures", path: "C:\\Users\\User\\Pictures", size: "3.4 GB" },
  { id: "music", name: "Music", path: "C:\\Users\\User\\Music", size: "850 MB" },
  { id: "videos", name: "Videos", path: "C:\\Users\\User\\Videos", size: "5.1 GB" },
  { id: "downloads", name: "Downloads", path: "C:\\Users\\User\\Downloads", size: "2.8 GB" },
  { id: "edge", name: "Edge Favorites", path: "C:\\Users\\User\\Favorites", size: "15 MB" },
  { id: "chrome", name: "Chrome Bookmarks", path: "C:\\Users\\User\\AppData\\Chrome", size: "8 MB" },
]

export function BackupDemo() {
  const [selectedFolders, setSelectedFolders] = useState<string[]>([])
  const [isBackingUp, setIsBackingUp] = useState(false)
  const [backupProgress, setBackupProgress] = useState(0)
  const [backupComplete, setBackupComplete] = useState(false)
  const [backupLocation, setBackupLocation] = useState("")

  const handleFolderToggle = (folderId: string) => {
    setSelectedFolders((prev) =>
      prev.includes(folderId) ? prev.filter((id) => id !== folderId) : [...prev, folderId]
    )
    setBackupComplete(false)
  }

  const simulateBackup = async () => {
    if (selectedFolders.length === 0) return

    const date = new Date().toISOString().split("T")[0]
    setBackupLocation(`D:\\Backups\\My_Last_Backup_${date}`)
    setIsBackingUp(true)
    setBackupProgress(0)
    setBackupComplete(false)

    // Simuler la progression de la sauvegarde
    for (let i = 0; i <= 100; i += 2) {
      await new Promise((resolve) => setTimeout(resolve, 30))
      setBackupProgress(i)
    }

    setIsBackingUp(false)
    setBackupComplete(true)
  }

  const totalSize = folders
    .filter((f) => selectedFolders.includes(f.id))
    .reduce((acc, f) => {
      const sizeNum = parseFloat(f.size)
      const unit = f.size.includes("GB") ? 1024 : 1
      return acc + sizeNum * unit
    }, 0)

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/40">
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <FolderOpen className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Backup Tool - Interactive Demo</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Sélectionnez les dossiers à sauvegarder (simulation sans exécution réelle)
          </p>
        </div>

        {/* Folder Selection */}
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
          {folders.map((folder) => (
            <div
              key={folder.id}
              className="flex items-start space-x-3 p-3 rounded-lg border border-border/40 hover:bg-muted/50 transition-colors"
            >
              <Checkbox
                id={folder.id}
                checked={selectedFolders.includes(folder.id)}
                onCheckedChange={() => handleFolderToggle(folder.id)}
                disabled={isBackingUp}
              />
              <div className="flex-1 space-y-1">
                <Label
                  htmlFor={folder.id}
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  {folder.name}
                </Label>
                <p className="text-xs text-muted-foreground">{folder.path}</p>
                <p className="text-xs text-primary">{folder.size}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        {selectedFolders.length > 0 && (
          <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
            <p className="text-sm">
              <span className="font-medium">{selectedFolders.length}</span> dossier(s) sélectionné(s) -{" "}
              <span className="font-medium">
                {totalSize >= 1024 ? `${(totalSize / 1024).toFixed(1)} GB` : `${totalSize.toFixed(0)} MB`}
              </span>
            </p>
          </div>
        )}

        {/* Progress Bar */}
        {(isBackingUp || backupComplete) && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {isBackingUp ? "Sauvegarde en cours..." : "Sauvegarde terminée !"}
              </span>
              <span className="font-medium">{backupProgress}%</span>
            </div>
            <Progress value={backupProgress} className="h-2" />
            {backupComplete && backupLocation && (
              <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                <Check className="h-4 w-4" />
                <span>Sauvegarde créée : {backupLocation}</span>
              </div>
            )}
          </div>
        )}

        {/* Action Button */}
        <Button
          onClick={simulateBackup}
          disabled={selectedFolders.length === 0 || isBackingUp}
          className="w-full"
          size="lg"
        >
          {isBackingUp ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
              Sauvegarde en cours...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Lancer la sauvegarde
            </>
          )}
        </Button>

        {/* Note */}
        <p className="text-xs text-muted-foreground text-center">
          💎 Démonstration interactive - Aucune sauvegarde réelle n'est effectuée
        </p>
      </div>
    </Card>
  )
}
