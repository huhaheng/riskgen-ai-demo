#!/bin/bash
# RiskGen AI 启动脚本

echo "🚀 正在启动 RiskGen AI..."
echo "📂 项目目录: $(pwd)"
echo ""
echo "🌐 服务器将在以下地址运行："
echo "   http://localhost:8000"
echo ""
echo "💡 提示："
echo "   - 在浏览器中访问上面的地址"
echo "   - 按 Ctrl+C 停止服务器"
echo ""
echo "-----------------------------------"
echo ""

python3 -m http.server 8000

