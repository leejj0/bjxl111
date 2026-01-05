import { UploadFile } from './types';

/**
 * 模拟后端压缩包处理服务
 */
export const ArchiveService = {
    // 判断是否为压缩包
    isArchive: (filename: string): boolean => {
        return /\.(zip|rar|7z|tar|gz)$/i.test(filename);
    },

    // 模拟后端判断是否需要解压密码
    checkPasswordNeeded: (filename: string): boolean => {
        // 模拟逻辑：文件名包含 'secret', 'pwd', 'enc' 视为加密
        return /secret|pwd|enc/i.test(filename);
    },

    // 验证密码
    verifyPassword: (password: string): boolean => {
        return password === '123456';
    },

    // 模拟解压过程，返回生成的新文件列表
    mockDecompress: (archiveFile: UploadFile): UploadFile[] => {
        const baseName = archiveFile.name.substring(0, archiveFile.name.lastIndexOf('.'));
        const timestamp = Date.now();
        
        // 模拟生成两个解压后的文件
        const newFiles: UploadFile[] = [
            {
                id: `${archiveFile.id}-ext-1-${timestamp}`,
                taskId: archiveFile.taskId,
                name: 'data_export_2025.csv',
                size: 1024 * 1024 * 5,
                uploaded: 1024 * 1024 * 5,
                speed: 0,
                progress: 100,
                status: 'completed',
                parsingMethod: 'structured',
                sourceArchive: archiveFile.name,
                extractedPath: `/${baseName}/data/`
            },
            {
                id: `${archiveFile.id}-ext-2-${timestamp}`,
                taskId: archiveFile.taskId,
                name: 'report_summary.docx',
                size: 1024 * 500,
                uploaded: 1024 * 500,
                speed: 0,
                progress: 100,
                status: 'completed',
                parsingMethod: 'unstructured',
                sourceArchive: archiveFile.name,
                extractedPath: `/${baseName}/docs/`
            }
        ];
        return newFiles;
    }
};
