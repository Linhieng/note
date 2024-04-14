# 源文件夹列表
$sourceFolders = $sourceFolders = @(
"D:\github-branch\note-DSA\DSA\course\Lecture01",
"D:\github-branch\note-DSA\DSA\course\Lecture02",
"D:\github-branch\note-DSA\DSA\course\Lecture03",
"D:\github-branch\note-DSA\DSA\course\Lecture04",
"D:\github-branch\note-DSA\DSA\course\Lecture05",
"D:\github-branch\note-DSA\DSA\course\Lecture06",
"D:\github-branch\note-DSA\DSA\course\Lecture07",
"D:\github-branch\note-DSA\DSA\course\Lecture08",
"D:\github-branch\note-DSA\DSA\course\Lecture09",
"D:\github-branch\note-DSA\DSA\course\Lecture10",
"D:\github-branch\note-DSA\DSA\course\Lecture11",
"D:\github-branch\note-DSA\DSA\course\Lecture12",
"D:\github-branch\note-DSA\DSA\course\Lecture13",
"D:\github-branch\note-DSA\DSA\course\Lecture14",
"D:\github-branch\note-DSA\DSA\course\Lecture15"
)

# 目标文件夹
$destinationFolder = "D:\github-branch\note-DSA\DSA\course"

# 遍历每个源文件夹
foreach ($folder in $sourceFolders) {
    # 获取源文件夹中的文件
    $files = Get-ChildItem -Path $folder -File

    # 将文件移动到目标文件夹
    foreach ($file in $files) {
        $destinationPath = Join-Path -Path $destinationFolder -ChildPath $file.Name
        Move-Item -Path $file.FullName -Destination $destinationPath
        Write-Host "✅ move " + $file.FullName + " to " + $destinationPath
    }
}

Write-Host "Files moved successfully."
