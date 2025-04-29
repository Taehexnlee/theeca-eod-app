# Multi-stage build for backend
FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG TARGETARCH
WORKDIR /src

COPY ["Theeca.EOD.API/Theeca.EOD.API.csproj", "Theeca.EOD.API/"]

# 여기 추가 - NuGet 서명 검사 끔 (M1에서는 필수)
ENV DOTNET_NUGET_SIGNATURE_VERIFICATION=false
RUN dotnet restore "Theeca.EOD.API/Theeca.EOD.API.csproj" -a $TARGETARCH

COPY . .
WORKDIR "/src/Theeca.EOD.API"
RUN dotnet publish -c Release -o /app/publish -a $TARGETARCH

# 런타임 스테이지
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
COPY --from=build /src/Theeca.EOD.API/wwwroot /app/wwwroot
ENTRYPOINT ["dotnet", "Theeca.EOD.API.dll"]