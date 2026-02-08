"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { FolderOpen, Plus, Trash2, Archive, Check, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface SelectedFolder {
  id: string
  name: string
  path: string
}

const availableFolders = [
  { path: "C:\\Users\\User\\Desktop", name: "Desktop" },
  { path: "C:\\Users\\User\\Documents", name: "Documents" },
  { path: "C:\\Users\\User\\Pictures", name: "Pictures" },
  { path: "C:\\Users\\User\\Music", name: "Music" },
  { path: "C:\\Users\\User\\Videos", name: "Videos" },
  { path: "C:\\Users\\User\\Downloads", name: "Downloads" },
  { path: "C:\\Program Files\\MyApp", name: "MyApp" },
  { path: "C:\\Projects", name: "Projects" },
]

export function BackupDemo() {
  const [selectedFolders, setSelectedFolders] = useState<SelectedFolder[]>([])
  const [isSelecting, setIsSelecting] = useState(false)
  const [currentBackup, setCurrentBackup] = useState<string | null>(null)
  const [backupProgress, setBackupProgress] = useState(0)
  const [completedBackups, setCompletedBackups] = useState<string[]>([])
  const [isBackingUp, setIsBackingUp] = useState(false)

  const destinationFolder = "D:\\Mon Drive"

  const handleAddFolder = (folder: { path: string; name: string }) => {
    const newFolder: SelectedFolder = {
      id: `${Date.now()}-${Math.random()}`,
      name: folder.name,
      path: folder.path,
    }
    setSelectedFolders([...selectedFolders, newFolder])
    setIsSelecting(false)
  }

  const handleRemoveFolder = (id: string) => {
    setSelectedFolders(selectedFolders.filter((f) => f.id !== id))
  }

  const simulateBackup = async () => {
    if (selectedFolders.length === 0) return

    setIsBackingUp(true)
    setCompletedBackups([])

    for (let i = 0; i < selectedFolders.length; i++) {
      const folder = selectedFolders[i]
      setCurrentBackup(folder.name)
      setBackupProgress(0)

      // Simuler la compression avec 7-Zip
      for (let progress = 0; progress <= 100; progress += 5) {
        await new Promise((resolve) => setTimeout(resolve, 50))
        setBackupProgress(progress)
      }

      setCompletedBackups((prev) => [...prev, folder.name])
      await new Promise((resolve) => setTimeout(resolve, 300))
    }

    setCurrentBackup(null)
    setIsBackingUp(false)
  }

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/40">
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Archive className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Outil de Sauvegarde 7-Zip</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Sélectionnez les dossiers à sauvegarder (simulation interactive du script PowerShell)
          </p>
        </div>

        {/* Configuration */}
        <div className="p-3 rounded-lg bg-muted/50 border border-border/40 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Destination :</span>
            <span className="font-mono font-medium">{destinationFolder}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Compression :</span>
            <span className="font-medium">7-Zip (AES-256)</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Format :</span>
            <span className="font-medium">.zip (protégé par mot de passe)</span>
          </div>
        </div>

        {/* Selected Folders List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">Dossiers sélectionnés ({selectedFolders.length})</h4>
            {!isBackingUp && (
              <Button
                onClick={() => setIsSelecting(!isSelecting)}
                variant="outline"
                size="sm"
                disabled={isBackingUp}
              >
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un dossier
              </Button>
            )}
          </div>

          {/* Folder Browser Dialog Simulation */}
          {isSelecting && (
            <div className="p-4 rounded-lg border-2 border-primary/50 bg-primary/5 space-y-2">
              <p className="text-sm font-medium mb-3">Choisissez un dossier à sauvegarder :</p>
              <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-y-auto">
                {availableFolders.map((folder) => (
                  <button
                    key={folder.path}
                    onClick={() => handleAddFolder(folder)}
                    className="p-3 text-left rounded-lg border border-border/40 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <FolderOpen className="h-4 w-4 text-primary" />
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{folder.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{folder.path}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <Button onClick={() => setIsSelecting(false)} variant="ghost" size="sm" className="w-full">
                Annuler
              </Button>
            </div>
          )}

          {/* Selected folders */}
          {selectedFolders.length === 0 && !isSelecting && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>Aucun dossier sélectionné. Cliquez sur "Ajouter un dossier" pour commencer.</AlertDescription>
            </Alert>
          )}

          {selectedFolders.length > 0 && (
            <div className="space-y-2 max-h-[250px] overflow-y-auto pr-2">
              {selectedFolders.map((folder) => (
                <div
                  key={folder.id}
                  className={`p-3 rounded-lg border transition-all ${
                    completedBackups.includes(folder.name)
                      ? "border-green-500/50 bg-green-500/10"
                      : currentBackup === folder.name
                        ? "border-primary/50 bg-primary/10"
                        : "border-border/40 bg-muted/30"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <FolderOpen className="h-4 w-4 text-primary flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium truncate">{folder.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{folder.path}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {completedBackups.includes(folder.name) && (
                        <Check className="h-4 w-4 text-green-500" />
                      )}
                      {!isBackingUp && (
                        <Button
                          onClick={() => handleRemoveFolder(folder.id)}
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                  {currentBackup === folder.name && (
                    <div className="mt-3 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Compression en cours...</span>
                        <span className="font-medium">{backupProgress}%</span>
                      </div>
                      <Progress value={backupProgress} className="h-1.5" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Success Messages */}
        {completedBackups.length > 0 && !isBackingUp && (
          <Alert className="border-green-500/50 bg-green-500/10">
            <Check className="h-4 w-4 text-green-500" />
            <AlertDescription className="text-sm">
              <strong>{completedBackups.length}</strong> dossier(s) sauvegardé(s) avec succès dans{" "}
              <span className="font-mono">{destinationFolder}</span>
              <div className="mt-2 space-y-1">
                {completedBackups.map((name) => (
                  <div key={name} className="text-xs text-muted-foreground">
                    ✓ {name}.zip (AES-256 encrypted)
                  </div>
                ))}
              </div>
            </AlertDescription>
          </Alert>
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
              Sauvegarde en cours ({completedBackups.length}/{selectedFolders.length})...
            </>
          ) : (
            <>
              <Archive className="mr-2 h-4 w-4" />
              Lancer la sauvegarde
            </>
          )}
        </Button>

        {/* Note */}
        <p className="text-xs text-muted-foreground text-center">
          💎 Simulation du script PowerShell - Aucune sauvegarde réelle n'est effectuée
        </p>
      </div>
    </Card>
  )
}
