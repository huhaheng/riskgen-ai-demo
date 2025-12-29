#!/bin/bash
# ============================================
# RiskGen AI - 快速更新到 GitHub
# ============================================

echo "🔄 准备更新代码到 GitHub..."
echo ""

# 检查是否有未提交的修改
if [ -z "$(git status --porcelain)" ]; then
    echo "✅ 没有需要提交的修改"
    exit 0
fi

# 显示修改的文件
echo "📝 修改的文件："
git status --short
echo ""

# 询问提交信息
read -p "💬 请输入提交说明（例如：更新数据/修复bug）：" commit_msg

if [ -z "$commit_msg" ]; then
    commit_msg="更新代码"
fi

# 执行 Git 操作
echo ""
echo "📦 添加修改..."
git add .

echo "💾 提交修改..."
git commit -m "$commit_msg"

echo "🚀 推送到 GitHub..."
git push

echo ""
echo "✅ 更新完成！"
echo "📊 查看更新：https://github.com/huhaheng/riskgen-ai-demo"

