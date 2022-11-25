import fs from "fs/promises";
import { existsSync, readFileSync } from "fs";
import { app } from "electron";
import { join } from "path";
import { MockFile } from "common/types";
import sampleFileSystem from "../../common/fileSystem/";
class FileSystemController {
  private static appDataPath = join(app.getPath("appData"), app.getName());
  constructor() {
    // console.log(FileSystemController.appDataPath);
  }
  public async test() {
    console.log(await fs.lstat(process.cwd()));
  }

  private async createDirIfNotExists(dirName: string) {
    if (!existsSync(dirName)) {
      return await fs.mkdir(dirName);
    }
  }

  private createFileWithContent(filePath: string, content: string) {
    return fs.writeFile(filePath, content);
  }

  public createAppDir() {
    return this.createDirIfNotExists(FileSystemController.appDataPath);
  }

  public async createTestFS() {
    this.createTestFSHelper(sampleFileSystem, FileSystemController.appDataPath);
  }

  private async createTestFSHelper(fs: MockFile, path: string): Promise<void> {
    await Promise.all(
      Object.entries(fs).map(async ([key, entry]) => {
        const currPath = join(path, key);
        if (typeof entry === "string") {
          return this.createFileWithContent(currPath, entry);
        } else {
          await this.createDirIfNotExists(currPath);
          return this.createTestFSHelper(entry, currPath);
        }
      })
    );
  }
}

export default FileSystemController;
